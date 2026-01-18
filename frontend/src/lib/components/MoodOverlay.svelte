<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { env } from "$env/dynamic/public";
	import { fade } from "svelte/transition";

	// State
	let isOpen = $state(false);
	let moodPrompt = $state("");
	let isGenerating = $state(false);
	let audioElement: HTMLAudioElement | null = $state(null);
	let audioUrl = $state<string | null>(null);
	let isPlaying = $state(false);
	let errorMessage = $state<string | null>(null);

	// Props
	let {
		showSpacebarHint = false,
		wingmanLoading = false,
		showWingmanModal = false,
		wingmanOptions = null,
		toastMessage = null, // string | null
		selectWingmanOption = (
			type: "pivot" | "joke" | "question",
			text: string,
		) => {},
		dismissWingman = () => {},
	} = $props<{
		showSpacebarHint?: boolean;
		wingmanLoading?: boolean;
		showWingmanModal?: boolean;
		wingmanOptions?: {
			pivot: string;
			joke: string;
			question: string;
		} | null;
		toastMessage?: string | null;
		selectWingmanOption?: (
			type: "pivot" | "joke" | "question",
			text: string,
		) => void;
		dismissWingman?: () => void;
	}>();

	// ElevenLabs Music API endpoint
	const ELEVENLABS_MUSIC_URL = "https://api.elevenlabs.io/v1/music";

	/**
	 * Use Gemini to generate a color palette based on mood
	 */
	async function generateColorPalette(
		mood: string,
	): Promise<{ bg: string; text: string; accent: string }> {
		try {
			const apiKey = env.PUBLIC_GEMINI_API_KEY;
			if (!apiKey) throw new Error("Missing Gemini API key");

			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						contents: [
							{
								parts: [
									{
										text: `Based on the mood "${mood}", generate a harmonious color palette for a calming, accessible UI. Return ONLY a JSON object with these exact keys:
- "bg": a dark, muted background color (hex)
- "text": a light, readable text color (hex)  
- "accent": a vibrant but not harsh accent color (hex)

Example: {"bg": "#1a1b26", "text": "#c0caf5", "accent": "#7aa2f7"}

Return ONLY the JSON, no explanation.`,
									},
								],
							},
						],
						generationConfig: {
							temperature: 0.7,
							maxOutputTokens: 100,
						},
					}),
				},
			);

			if (!response.ok) throw new Error("Gemini API error");

			const data = await response.json();
			const content =
				data.candidates?.[0]?.content?.parts?.[0]?.text || "";

			// Extract JSON from response
			const jsonMatch = content.match(/\{[\s\S]*\}/);
			if (jsonMatch) {
				const parsed = JSON.parse(jsonMatch[0]);
				return {
					bg: parsed.bg || "#1e1e2e",
					text: parsed.text || "#cdd6f4",
					accent: parsed.accent || "#89b4fa",
				};
			}
		} catch (error) {
			console.error("Color palette generation error:", error);
		}

		// Fallback palette
		return {
			bg: "#1e1e2e",
			text: "#cdd6f4",
			accent: "#89b4fa",
		};
	}

	/**
	 * Apply color palette to :root CSS variables
	 */
	function applyColorPalette(palette: {
		bg: string;
		text: string;
		accent: string;
	}) {
		if (!browser) return;

		document.documentElement.style.setProperty("--mood-bg", palette.bg);
		document.documentElement.style.setProperty("--mood-text", palette.text);
		document.documentElement.style.setProperty(
			"--mood-accent",
			palette.accent,
		);
	}

	/**
	 * Generate ambient music using ElevenLabs Music API
	 */
	async function generateMusic(prompt: string): Promise<string | null> {
		const apiKey = env.PUBLIC_ELEVENLABS_API_KEY;
		if (!apiKey) throw new Error("Missing ElevenLabs API key");

		const response = await fetch(ELEVENLABS_MUSIC_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"xi-api-key": apiKey,
			},
			body: JSON.stringify({
				prompt: `Ambient, calming, loopable background music for a ${prompt} mood. 30 seconds, gentle and non-intrusive.`,
				duration_seconds: 30,
				loop: true,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(
				errorData.detail?.message || "Failed to generate music",
			);
		}

		const blob = await response.blob();
		return URL.createObjectURL(blob);
	}

	/**
	 * Handle mood submission
	 */
	async function handleSubmit() {
		if (!moodPrompt.trim() || isGenerating) return;

		isGenerating = true;
		errorMessage = null;

		try {
			// Generate color palette and apply it
			const palette = await generateColorPalette(moodPrompt);
			applyColorPalette(palette);

			// Generate music
			try {
				const newAudioUrl = await generateMusic(moodPrompt);

				// Clean up old audio URL
				if (audioUrl) {
					URL.revokeObjectURL(audioUrl);
				}

				audioUrl = newAudioUrl;

				// Auto-play the new music
				if (audioElement && audioUrl) {
					audioElement.src = audioUrl;
					audioElement.loop = true;
					await audioElement.play();
					isPlaying = true;
				}
			} catch (musicError) {
				console.error("Music generation error:", musicError);
				errorMessage =
					"Music generation unavailable, but colors applied!";
			}

			isOpen = false;
		} catch (error) {
			console.error("Mood overlay error:", error);
			errorMessage = "Failed to apply mood settings";
		} finally {
			isGenerating = false;
		}
	}

	/**
	 * Toggle audio playback
	 */
	function togglePlayback() {
		if (!audioElement) return;

		if (isPlaying) {
			audioElement.pause();
			isPlaying = false;
		} else {
			audioElement.play();
			isPlaying = true;
		}
	}

	/**
	 * Reset mood overlay
	 */
	function resetMood() {
		if (audioElement) {
			audioElement.pause();
			audioElement.src = "";
		}

		if (audioUrl) {
			URL.revokeObjectURL(audioUrl);
			audioUrl = null;
		}

		isPlaying = false;

		// Reset CSS variables
		if (browser) {
			document.documentElement.style.removeProperty("--mood-bg");
			document.documentElement.style.removeProperty("--mood-text");
			document.documentElement.style.removeProperty("--mood-accent");
		}
	}

	// Cleanup on destroy
	onDestroy(() => {
		resetMood();
	});
</script>

<!-- Hidden audio element -->
<audio bind:this={audioElement} class="hidden"></audio>

<!-- Floating Action Button -->
<div class="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
	<!-- Audio controls (visible when playing) -->
	{#if audioUrl}
		<div
			class="flex items-center gap-2 rounded-full bg-slate-800/90 px-4 py-2 backdrop-blur-md"
		>
			<button
				type="button"
				onclick={togglePlayback}
				class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 transition-colors hover:bg-indigo-500/40"
				aria-label={isPlaying ? "Pause music" : "Play music"}
			>
				{#if isPlaying}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<rect x="6" y="4" width="4" height="16" rx="1" />
						<rect x="14" y="4" width="4" height="16" rx="1" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<polygon points="5,3 19,12 5,21" />
					</svg>
				{/if}
			</button>
			<span class="text-xs text-slate-300">Mood Music</span>
			<button
				type="button"
				onclick={resetMood}
				class="ml-2 text-slate-400 transition-colors hover:text-red-400"
				aria-label="Stop and reset"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>
	{/if}

	<!-- Main FAB -->
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 active:scale-95"
		aria-label="Set mood"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M8 14s1.5 2 4 2 4-2 4-2" />
			<line x1="9" y1="9" x2="9.01" y2="9" />
			<line x1="15" y1="9" x2="15.01" y2="9" />
		</svg>
	</button>
</div>

<!-- Mood Input Panel -->
{#if isOpen}
	<div class="fixed bottom-24 left-6 z-50 w-80 animate-fade-in">
		<div
			class="rounded-2xl border border-purple-400/20 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl"
		>
			<h3 class="mb-3 text-lg font-semibold text-white">Set Your Mood</h3>
			<p class="mb-4 text-sm text-slate-400">
				Describe how you want to feel. We'll adjust colors and generate
				ambient music.
			</p>

			<div class="space-y-4">
				<input
					type="text"
					bind:value={moodPrompt}
					placeholder="e.g., calm and focused, energized, cozy..."
					class="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
					onkeydown={(e) => e.key === "Enter" && handleSubmit()}
					disabled={isGenerating}
				/>

				{#if errorMessage}
					<p class="text-sm text-amber-400">{errorMessage}</p>
				{/if}

				<div class="flex gap-3">
					<button
						type="button"
						onclick={() => (isOpen = false)}
						class="flex-1 rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
						disabled={isGenerating}
					>
						Cancel
					</button>
					<button
						type="button"
						onclick={handleSubmit}
						disabled={!moodPrompt.trim() || isGenerating}
						class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if isGenerating}
							<div
								class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
							></div>
							Generating...
						{:else}
							Apply Mood
						{/if}
					</button>
				</div>
			</div>

			<!-- Quick mood presets -->
			<div class="mt-4 border-t border-slate-700 pt-4">
				<p class="mb-2 text-xs text-slate-500">Quick presets:</p>
				<div class="flex flex-wrap gap-2">
					{#each ["calm", "focused", "cozy", "energized"] as preset}
						<button
							type="button"
							onclick={() => {
								moodPrompt = preset;
								handleSubmit();
							}}
							class="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-400 transition-colors hover:border-purple-400 hover:text-purple-300"
							disabled={isGenerating}
						>
							{preset}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Toast Notification -->
{#if toastMessage}
	<div
		class="animate-fade-in fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-full bg-emerald-500/90 px-6 py-2 text-white shadow-lg backdrop-blur-md"
	>
		<div class="flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
				<polyline points="22 4 12 14.01 9 11.01" />
			</svg>
			<span class="font-medium">{toastMessage}</span>
		</div>
	</div>
{/if}

<!-- Spacebar Hint -->
{#if showSpacebarHint && !showWingmanModal && !isOpen}
	<div
		class="animate-fade-in pointer-events-none fixed bottom-10 left-1/2 z-40 -translate-x-1/2 text-center transition-opacity duration-300"
	>
		<div
			class="flex items-center gap-2 rounded-lg bg-black/40 px-4 py-2 text-sm text-white/50 backdrop-blur-sm"
		>
			<span
				class="rounded border border-white/20 px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white/70"
				>Space</span
			>
			<span>for Wingman</span>
		</div>
	</div>
{/if}

<!-- Wingman Modal (Compact Bottom Sheet) -->
{#if showWingmanModal}
	<div
		class="fixed bottom-32 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 transform px-4 transition-all duration-300 ease-out"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}
	>
		<!-- Semi-transparent backing plate -->
		<div
			class="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl"
		>
			{#if wingmanLoading}
				<div class="flex items-center justify-center gap-4 py-8">
					<div class="relative h-12 w-12">
						<div
							class="absolute inset-0 animate-ping rounded-full bg-indigo-500/20"
						></div>
						<div
							class="relative flex h-full w-full items-center justify-center rounded-full border-2 border-indigo-500/50 border-t-indigo-400 animate-spin"
						></div>
					</div>
					<div>
						<h3 class="text-lg font-bold text-white">
							Analyzing...
						</h3>
						<p class="text-xs text-indigo-300/80">
							Wingman is generating compatible responses
						</p>
					</div>
				</div>
			{:else if wingmanOptions}
				<div class="relative p-2">
					<button
						onclick={dismissWingman}
						class="absolute -right-2 -top-2 z-10 rounded-full bg-slate-800 p-1.5 text-slate-400 hover:text-white"
						aria-label="Dismiss Wingman"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><line x1="18" y1="6" x2="6" y2="18"></line><line
								x1="6"
								y1="6"
								x2="18"
								y2="18"
							></line></svg
						>
					</button>

					<div class="grid grid-cols-3 gap-2">
						<!-- Option 1: Pivot -->
						<button
							class="group relative flex flex-col gap-2 rounded-2xl bg-white/5 p-3 text-left transition-all hover:bg-white/10"
							onclick={() =>
								selectWingmanOption?.(
									"pivot",
									wingmanOptions!.pivot,
								)}
						>
							<div class="flex items-center gap-2">
								<div
									class="rounded-lg bg-indigo-500/20 p-1.5 text-indigo-400"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path d="M3 21l18 0" /><path
											d="M5 21v-7a6 6 0 0 1 12 0v7"
										/><path
											d="M22 6a3 3 0 0 1-3 3h-6"
										/></svg
									>
								</div>
								<span
									class="text-xs font-bold uppercase tracking-wider text-indigo-300"
									>Pivot (1)</span
								>
							</div>
							<p
								class="line-clamp-3 text-xs leading-relaxed text-slate-300 group-hover:text-white"
							>
								{wingmanOptions.pivot}
							</p>
						</button>

						<!-- Option 2: Joke -->
						<button
							class="group relative flex flex-col gap-2 rounded-2xl bg-white/5 p-3 text-left transition-all hover:bg-white/10"
							onclick={() =>
								selectWingmanOption?.(
									"joke",
									wingmanOptions!.joke,
								)}
						>
							<div class="flex items-center gap-2">
								<div
									class="rounded-lg bg-pink-500/20 p-1.5 text-pink-400"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><circle cx="12" cy="12" r="10" /><path
											d="M8 14s1.5 2 4 2 4-2 4-2"
										/></svg
									>
								</div>
								<span
									class="text-xs font-bold uppercase tracking-wider text-pink-300"
									>Joke (2)</span
								>
							</div>
							<p
								class="line-clamp-3 text-xs leading-relaxed text-slate-300 group-hover:text-white"
							>
								{wingmanOptions.joke}
							</p>
						</button>

						<!-- Option 3: Question -->
						<button
							class="group relative flex flex-col gap-2 rounded-2xl bg-white/5 p-3 text-left transition-all hover:bg-white/10"
							onclick={() =>
								selectWingmanOption?.(
									"question",
									wingmanOptions!.question,
								)}
						>
							<div class="flex items-center gap-2">
								<div
									class="rounded-lg bg-emerald-500/20 p-1.5 text-emerald-400"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><circle cx="12" cy="12" r="10" /><path
											d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
										/><line
											x1="12"
											y1="17"
											x2="12.01"
											y2="17"
										/></svg
									>
								</div>
								<span
									class="text-xs font-bold uppercase tracking-wider text-emerald-300"
									>Ask (3)</span
								>
							</div>
							<p
								class="line-clamp-3 text-xs leading-relaxed text-slate-300 group-hover:text-white"
							>
								{wingmanOptions.question}
							</p>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.2s ease-out;
	}
</style>
