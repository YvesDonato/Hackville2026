<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import { get } from "svelte/store";
	import type {
		FeedbackMetric,
		SessionStats,
		SessionConfig,
	} from "$lib/types";
	import {
		sessionConfig,
		sessionStats,
		sessionStartTime,
	} from "$lib/stores/session";
	import {
		transcript,
		addTranscriptEntry,
		clearTranscript,
	} from "$lib/stores/transcript";
	import {
		currentFeedback,
		setFeedback,
		clearFeedback,
	} from "$lib/stores/feedback";
	import { LiveSessionClient } from "$lib/services/liveClient";
	import { analyzeTranscript } from "$lib/services/transcriptAnalyzer";
	import { getPersonaDisplayName } from "$lib/data/personas";
	import { getScenarioDisplayName } from "$lib/data/scenarios";
	import {
		elevenLabsService,
		ElevenLabsService,
	} from "$lib/services/elevenLabs";
	import SessionControls from "$lib/components/SessionControls.svelte";
	import ThrelteScene from "$lib/components/ThrelteScene.svelte";
	import MoodOverlay from "$lib/components/MoodOverlay.svelte";

	let videoRef: HTMLVideoElement | null = $state(null);
	let isConnected = $state(false);
	let isAnalyzing = $state(false);
	let micActive = $state(true);
	let client: LiveSessionClient | null = null;
	let videoStream: MediaStream | null = null;
	let feedbackInterval: number | null = null;

	let config = $state<SessionConfig | null>(null);
	let personaName = $state("");
	let scenarioName = $state("");
	let personaKey = $state<SessionConfig['persona'] | null>(null);

	// Wingman state
	let wingmanLoading = $state(false);
	let wingmanOptions = $state<{
		pivot: string;
		joke: string;
		question: string;
	} | null>(null);
	let showWingmanModal = $state(false);
	let wingmanTimeout: number | null = null;

	// Toast notification state
	let toastMessage = $state<string | null>(null);
	let toastTimeout: number | null = null;
	let showSpacebarHint = $state(true);

	// Subtitle/transcript display state
	let showSubtitles = $state(true);

	/**
	 * Show a toast notification
	 */
	function showToast(message: string, duration = 3000) {
		toastMessage = message;
		if (toastTimeout) clearTimeout(toastTimeout);
		toastTimeout = window.setTimeout(() => {
			toastMessage = null;
		}, duration);
	}

	/**
	 * Handle wingman option selection
	 */
	async function selectWingmanOption(
		optionType: "pivot" | "joke" | "question",
		text: string,
	) {
		// Dismiss modal immediately
		showWingmanModal = false;
		wingmanOptions = null;
		if (wingmanTimeout) {
			clearTimeout(wingmanTimeout);
			wingmanTimeout = null;
		}

		// 1. Mute Mic to prevent noise/interruption
		// 1. Mute user voice (Software Mute) to prevent interruption
		// We don't touch 'micActive' so UI stays "On"
		if (client) {
			client.setMicMuted(true);

			// 2. Generate and inject audio directly
			try {
				const audioBlob = await elevenLabsService.convertTextToSpeech(
					text,
					ElevenLabsService.VOICES.MALE,
				);
				await client.injectAudioFromBlob(audioBlob);
			} catch (e) {
				console.error("Wingman TTS injection failed:", e);
				showToast("Failed to send audio to AI", 2000);
			} finally {
				// 3. Auto-unmute immediately after sending
				if (client) client.setMicMuted(false);
			}
		}

		// Show toast feedback
		const labels = {
			pivot: "🔄 Pivot Sent",
			joke: "😄 Joke Sent",
			question: "❓ Question Sent",
		};
		showToast(`${labels[optionType]} to AI! Mic muted.`);

		// Add suggestion to transcript as if user said it
		addTranscriptEntry("user", text);
	}

	/**
	 * Handle Spacebar panic button - calls Wingman API asynchronously
	 */
	async function handleWingmanRequest() {
		if (wingmanLoading || !isConnected) return;

		wingmanLoading = true;
		showWingmanModal = true;

		try {
			// Get current transcript
			const currentTranscript = get(transcript);
			const transcriptText = currentTranscript
				.map(
					(entry) =>
						`${entry.speaker === "user" ? "User" : "Date"}: ${entry.text}`,
				)
				.join("\n");

			// Call Wingman API (async, non-blocking)
			const response = await fetch("/api/wingman", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ transcript: transcriptText }),
			});

			const options = await response.json();
			wingmanOptions = options;

			// Auto-dismiss after 10 seconds
			if (wingmanTimeout) clearTimeout(wingmanTimeout);
			wingmanTimeout = window.setTimeout(() => {
				showWingmanModal = false;
				wingmanOptions = null;
			}, 10000);
		} catch (error) {
			console.error("Wingman request failed:", error);
			// Use fallback options
			wingmanOptions = {
				pivot: "That reminds me - what do you think about...?",
				joke: "Why don't eggs tell jokes? They'd crack each other up!",
				question: "What's something you've always wanted to try?",
			};
		} finally {
			wingmanLoading = false;
		}
	}

	/**
	 * Dismiss the wingman modal
	 */
	function dismissWingman() {
		showWingmanModal = false;
		wingmanOptions = null;
		if (wingmanTimeout) {
			clearTimeout(wingmanTimeout);
			wingmanTimeout = null;
		}
	}

	/**
	 * Handle keyboard events (Spacebar for panic button)
	 */
	function handleKeydown(event: KeyboardEvent) {
		// Only trigger on Spacebar when not typing in an input
		if (
			event.code === "Space" &&
			!(
				event.target instanceof HTMLInputElement ||
				event.target instanceof HTMLTextAreaElement
			)
		) {
			event.preventDefault();
			handleWingmanRequest();
		}
		// Escape to dismiss
		if (event.code === "Escape" && showWingmanModal) {
			dismissWingman();
		}
	}

	// Mock stats generator
	function generateMockStats(): SessionStats {
		const currentTranscript = get(transcript);
		const startTime = get(sessionStartTime) || Date.now();
		const duration = Math.floor((Date.now() - startTime) / 1000);

		const strengthsPool = [
			"You maintained a warm and inviting tone throughout the conversation.",
			"Your pacing was excellent - not too fast, not too slow.",
			"You asked thoughtful follow-up questions that showed genuine interest.",
			"Your body language appeared open and engaged.",
			"You handled pauses naturally without rushing to fill silence.",
			"Your responses were well-structured and easy to follow.",
		];

		const improvementsPool = [
			"Try maintaining eye contact for slightly longer periods.",
			"Consider taking a breath before responding to complex questions.",
			"Practice active listening cues like nodding or brief verbal affirmations.",
			"Work on varying your vocal tone to add more expressiveness.",
			"Try to relax your shoulders during intense moments.",
		];

		// Random selection
		const shuffledStrengths = [...strengthsPool].sort(
			() => Math.random() - 0.5,
		);
		const shuffledImprovements = [...improvementsPool].sort(
			() => Math.random() - 0.5,
		);

		return {
			duration,
			strengths: shuffledStrengths.slice(0, 3),
			improvements: shuffledImprovements.slice(0, 2),
			transcript: currentTranscript,
		};
	}

	// Biometric feedback simulation
	function startFeedbackLoop() {
		feedbackInterval = window.setInterval(() => {
			if (!isConnected) return;

			const r = Math.random();
			if (r > 0.95) {
				setFeedback({
					timestamp: Date.now(),
					type: "eye_contact",
					message: "Gentle reminder: Try to look at the camera.",
					severity: "info",
				});
			} else if (r > 0.9 && r < 0.92) {
				setFeedback({
					timestamp: Date.now(),
					type: "pacing",
					message: "Great pacing! You are speaking clearly.",
					severity: "success",
				});
			} else if (r < 0.05) {
				setFeedback({
					timestamp: Date.now(),
					type: "posture",
					message: "Relax your shoulders, take a deep breath.",
					severity: "info",
				});
			} else if (Math.random() > 0.7) {
				clearFeedback();
			}
		}, 4000);
	}

	async function initSession() {
		if (!config || !videoRef) return;

		try {
			// Setup Video
			videoStream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});
			videoRef.srcObject = videoStream;
			await videoRef.play();

			// Record start time
			sessionStartTime.set(Date.now());
			clearTranscript();

			// Setup Client
			client = new LiveSessionClient();
			await client.connect(
				config.scenario,
				config.persona,
				videoRef,
				(speaker, text) => {
					addTranscriptEntry(speaker, text);
				},
				() => {
					handleEndSession();
				},
			);

			isConnected = true;
			startFeedbackLoop();
		} catch (err) {
			console.error("Failed to init session:", err);
		}
	}

	async function handleEndSession() {
		// Prevent double-triggering
		if (isAnalyzing) return;

		isAnalyzing = true;

		const currentTranscript = get(transcript);
		const startTime = get(sessionStartTime) || Date.now();
		const duration = Math.floor((Date.now() - startTime) / 1000);

		// Stop the session resources
		cleanup();

		try {
			const currentConfig = get(sessionConfig);
			if (!currentConfig) {
				throw new Error("Session config not found");
			}

			// Call Gemini for analysis
			const analysis = await analyzeTranscript(
				currentTranscript,
				currentConfig.scenario,
				currentConfig.persona,
			);

			const stats: SessionStats = {
				duration,
				strengths: analysis.strengths,
				improvements: analysis.improvements,
				transcript: currentTranscript,
			};

			sessionStats.set(stats);
		} catch (error) {
			console.error("Analysis failed:", error);

			// Fallback to empty feedback
			const stats: SessionStats = {
				duration,
				strengths: ["Session too short"],
				improvements: ["Session too short"],
				transcript: currentTranscript,
			};
			sessionStats.set(stats);
		}

		goto("/rewind");
	}

	function cleanup() {
		if (feedbackInterval) {
			clearInterval(feedbackInterval);
			feedbackInterval = null;
		}

		if (videoStream) {
			videoStream.getTracks().forEach((t) => t.stop());
			videoStream = null;
		}

		if (client) {
			client.disconnect();
			client = null;
		}

		clearFeedback();
	}

	onMount(() => {
		config = get(sessionConfig);
		if (!config) {
			goto("/lab");
			return;
		}
		personaName = getPersonaDisplayName(config.persona);
		scenarioName = getScenarioDisplayName(config.scenario);
		personaKey = config.persona;

		// Add keyboard listener for panic button
		if (browser) {
			window.addEventListener("keydown", handleKeydown);
		}
	});

	// Watch for videoRef to be available, then init session
	$effect(() => {
		if (config && videoRef && !isConnected && !client) {
			initSession();
		}
	});

	// Watch for mic toggle and mute/unmute audio
	$effect(() => {
		if (client) {
			client.setMicMuted(!micActive);
		}
	});

	onDestroy(() => {
		cleanup();
		// Remove keyboard listener
		if (browser) {
			window.removeEventListener("keydown", handleKeydown);
		}
		// Clear wingman timeout
		if (wingmanTimeout) {
			clearTimeout(wingmanTimeout);
		}
	});

	// Subscribe to feedback store
	let feedback: FeedbackMetric | null = $state(null);
	const unsubscribeFeedback = currentFeedback.subscribe((value) => {
		feedback = value;
	});

	onDestroy(() => {
		unsubscribeFeedback();
	});
</script>

{#if config}
	<!-- Loading Overlay -->
	{#if isAnalyzing}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95"
		>
			<div class="space-y-6 text-center">
				<div class="relative">
					<div
						class="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500"
					></div>
				</div>
				<div class="space-y-2">
					<h2 class="text-xl font-semibold text-white">
						Analyzing Your Session
					</h2>
					<p class="text-sm text-slate-400">
						AI is reviewing your conversation...
					</p>
				</div>
			</div>
		</div>
	{/if}

	<div
		class="relative flex h-screen flex-col overflow-hidden bg-slate-900 text-white"
	>
		<!-- Top Bar -->
		<div
			class="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4"
		>
			<div class="flex items-center gap-2">
				<span
					class="h-2 w-2 rounded-full {isConnected
						? 'animate-pulse bg-red-500'
						: 'bg-slate-500'}"
				></span>
				<span
					class="text-sm font-medium uppercase tracking-wide opacity-80"
				>
					Live Session &bull; {scenarioName}
				</span>
			</div>
			<button
				type="button"
				onclick={handleEndSession}
				class="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-100 backdrop-blur-sm transition-all hover:bg-red-500/40"
			>
				<!-- Phone off icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"
					/>
					<line x1="22" x2="2" y1="2" y2="22" />
				</svg>
				<span class="text-sm font-semibold">End Call</span>
			</button>
		</div>

		<!-- Main Scene Area -->
		<div class="relative flex flex-1 items-center justify-center">
			<!-- Threlte 3D Scene Background -->
			{#if browser}
				<div class="absolute inset-0 z-0 h-full w-full">
					<ThrelteScene persona={personaKey ?? undefined} />
				</div>
			{/if}

			<!-- Self View (User) - PiP Style in Bottom Right -->
			<div class="absolute bottom-24 right-4 z-20">
				<div
					class="relative overflow-hidden rounded-xl border-2 border-white/20 shadow-2xl"
				>
					<video
						bind:this={videoRef}
						class="h-[150px] w-[200px] object-cover"
						muted
						playsinline
					></video>
					<!-- Connection indicator -->
					<div class="absolute bottom-2 left-2">
						<span
							class="flex h-3 w-3 items-center justify-center rounded-full {isConnected
								? 'bg-green-500'
								: 'bg-amber-500'}"
						>
							<span
								class="h-2 w-2 rounded-full {isConnected
									? 'animate-ping bg-green-400'
									: 'bg-amber-400'}"
							></span>
						</span>
					</div>
				</div>
			</div>

			<!-- Persona Overlay (Abstract Representation) -->
			<div
				class="relative z-10 flex flex-col items-center justify-center p-8 text-center"
			>
				<div
					class="mb-6 flex h-32 w-32 items-center justify-center rounded-full shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-500 {isConnected
						? 'scale-100 border-2 border-indigo-400/50 bg-indigo-500/20'
						: 'scale-90 bg-slate-800'}"
				>
					{#if isConnected}
						<div class="space-y-1">
							<div
								class="h-1 w-16 animate-pulse rounded-full bg-indigo-300"
								style="animation-delay: 0s"
							></div>
							<div
								class="mx-auto h-1 w-10 animate-pulse rounded-full bg-indigo-300"
								style="animation-delay: 0.2s"
							></div>
							<div
								class="h-1 w-14 animate-pulse rounded-full bg-indigo-300"
								style="animation-delay: 0.4s"
							></div>
						</div>
					{:else}
						<!-- User icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-slate-500"
						>
							<path
								d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
							/>
							<circle cx="12" cy="7" r="4" />
						</svg>
					{/if}
				</div>
				<h2 class="mb-2 text-2xl font-light tracking-tight">
					{personaName}
					{#if config.persona === "discord_kitten"}
						<span>&#128572;</span>
					{/if}
				</h2>
				<p class="max-w-xs text-sm text-indigo-200/60">
					{isConnected ? "Listening & Analyzing..." : "Connecting..."}
				</p>
			</div>

			<!-- Visual Guardrail / Feedback Banner -->
			{#if feedback}
				<div
					class="animate-fade-in absolute bottom-32 left-1/2 z-30 -translate-x-1/2 rounded-2xl px-6 py-3 shadow-lg backdrop-blur-md transition-all duration-500
					{feedback.severity === 'info'
						? 'border border-blue-400/30 bg-blue-500/20 text-blue-100'
						: ''}
					{feedback.severity === 'warning'
						? 'border border-amber-400/30 bg-amber-500/20 text-amber-100'
						: ''}
					{feedback.severity === 'success'
						? 'border border-emerald-400/30 bg-emerald-500/20 text-emerald-100'
						: ''}"
				>
					<div class="flex items-center gap-3">
						{#if feedback.type === "eye_contact"}
							<!-- Eye icon -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
								/>
								<circle cx="12" cy="12" r="3" />
							</svg>
						{:else if feedback.type === "posture"}
							<!-- User icon -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
								/>
								<circle cx="12" cy="7" r="4" />
							</svg>
						{:else}
							<!-- Check icon for pacing/tone -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 6 9 17l-5-5" />
							</svg>
						{/if}
						<span class="text-sm font-medium"
							>{feedback.message}</span
						>
					</div>
				</div>
			{/if}
		</div>

		<!-- Controls Bar -->
		<SessionControls
			bind:micActive
			{isConnected}
			onEndSession={handleEndSession}
		/>

		<!-- Wingman HUD Overlay -->
		{#if showWingmanModal}
			<div
				class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md"
				onclick={dismissWingman}
				onkeydown={(e) => e.key === "Escape" && dismissWingman()}
				role="dialog"
				aria-modal="true"
				aria-label="Wingman coaching suggestions"
			>
				<div
					class="mx-4 w-full max-w-lg animate-scale-in rounded-3xl border border-indigo-400/30 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl"
					onclick={(e) => e.stopPropagation()}
					onkeydown={() => {}}
					role="presentation"
				>
					<!-- Header -->
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									class="text-indigo-400"
								>
									<path d="M12 2L2 7l10 5 10-5-10-5z" />
									<path d="M2 17l10 5 10-5" />
									<path d="M2 12l10 5 10-5" />
								</svg>
							</div>
							<div>
								<h3 class="text-lg font-semibold text-white">
									Cortex Wingman
								</h3>
								<p class="text-xs text-slate-400">
									Press Escape or tap outside to dismiss
								</p>
							</div>
						</div>
						<button
							type="button"
							onclick={dismissWingman}
							class="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
							aria-label="Close"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
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

					<!-- Loading State -->
					{#if wingmanLoading}
						<div
							class="flex flex-col items-center justify-center py-8"
						>
							<div
								class="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500"
							></div>
							<p class="mt-4 text-sm text-slate-400">
								Analyzing conversation...
							</p>
						</div>
					{:else if wingmanOptions}
						<!-- Coaching Options -->
						<div class="space-y-3">
							<!-- Pivot -->
							<button
								type="button"
								onclick={() =>
									wingmanOptions &&
									selectWingmanOption(
										"pivot",
										wingmanOptions.pivot,
									)}
								class="group w-full rounded-xl border border-amber-400/20 bg-amber-500/10 p-4 text-left transition-all hover:border-amber-400/40 hover:bg-amber-500/20 active:scale-[0.98]"
							>
								<div class="mb-1 flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										class="text-amber-400"
									>
										<polyline points="15,4 20,4 20,9" />
										<path d="M20 4L10 14" />
										<path d="M4 20l6-6" />
									</svg>
									<span
										class="text-xs font-semibold uppercase tracking-wide text-amber-400"
										>Pivot Topic</span
									>
								</div>
								<p class="text-sm text-white">
									{wingmanOptions.pivot}
								</p>
							</button>

							<!-- Joke -->
							<button
								type="button"
								onclick={() =>
									wingmanOptions &&
									selectWingmanOption(
										"joke",
										wingmanOptions.joke,
									)}
								class="group w-full rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-left transition-all hover:border-emerald-400/40 hover:bg-emerald-500/20 active:scale-[0.98]"
							>
								<div class="mb-1 flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										class="text-emerald-400"
									>
										<circle cx="12" cy="12" r="10" />
										<path d="M8 14s1.5 2 4 2 4-2 4-2" />
										<line x1="9" y1="9" x2="9.01" y2="9" />
										<line
											x1="15"
											y1="9"
											x2="15.01"
											y2="9"
										/>
									</svg>
									<span
										class="text-xs font-semibold uppercase tracking-wide text-emerald-400"
										>Light Humor</span
									>
								</div>
								<p class="text-sm text-white">
									{wingmanOptions.joke}
								</p>
							</button>

							<!-- Question -->
							<button
								type="button"
								onclick={() =>
									wingmanOptions &&
									selectWingmanOption(
										"question",
										wingmanOptions.question,
									)}
								class="group w-full rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-left transition-all hover:border-blue-400/40 hover:bg-blue-500/20 active:scale-[0.98]"
							>
								<div class="mb-1 flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										class="text-blue-400"
									>
										<circle cx="12" cy="12" r="10" />
										<path
											d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
										/>
										<line
											x1="12"
											y1="17"
											x2="12.01"
											y2="17"
										/>
									</svg>
									<span
										class="text-xs font-semibold uppercase tracking-wide text-blue-400"
										>Great Question</span
									>
								</div>
								<p class="text-sm text-white">
									{wingmanOptions.question}
								</p>
							</button>
						</div>

						<p class="mt-4 text-center text-xs text-slate-500">
							Select an option to dismiss • Auto-closes in 10s
						</p>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Toast Notification -->
		{#if toastMessage}
			<div
				class="fixed left-1/2 top-6 z-50 -translate-x-1/2 animate-slide-down"
			>
				<div
					class="flex items-center gap-3 rounded-full border border-emerald-400/30 bg-slate-900/95 px-5 py-3 shadow-xl backdrop-blur-xl"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						class="text-emerald-400"
					>
						<path d="M20 6 9 17l-5-5" />
					</svg>
					<span class="text-sm font-medium text-white"
						>{toastMessage}</span
					>
				</div>
			</div>
		{/if}

		<!-- Live Subtitles Overlay -->
		{#if showSubtitles && $transcript.length > 0}
			<div
				class="pointer-events-none fixed bottom-28 left-0 right-0 z-30 flex flex-col items-center px-4"
			>
				<div class="w-full max-w-2xl space-y-2">
					{#each $transcript.slice(-3) as entry, i}
						<div
							class="flex justify-center"
							style="opacity: {0.5 + (i + 1) * 0.25}"
						>
							<div
								class="rounded-lg px-4 py-2 backdrop-blur-sm {entry.speaker ===
								'user'
									? 'bg-indigo-500/30 text-indigo-100'
									: 'bg-slate-700/50 text-slate-100'}"
							>
								<span
									class="mr-2 text-xs font-semibold uppercase opacity-60"
								>
									{entry.speaker === "user"
										? "You"
										: personaName}:
								</span>
								<span class="text-sm">
									{entry.text.length > 100
										? entry.text.slice(-100) + "..."
										: entry.text}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Subtitle Toggle Button -->
		<button
			type="button"
			onclick={() => (showSubtitles = !showSubtitles)}
			class="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border {showSubtitles
				? 'border-indigo-400/30 bg-indigo-500/20'
				: 'border-slate-600 bg-slate-800/80'} shadow-lg backdrop-blur-sm transition-all hover:scale-105"
			aria-label={showSubtitles ? "Hide subtitles" : "Show subtitles"}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				class={showSubtitles ? "text-indigo-300" : "text-slate-400"}
			>
				<rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
				<line x1="6" y1="12" x2="18" y2="12" />
				<line x1="6" y1="16" x2="14" y2="16" />
			</svg>
		</button>

		<!-- Spacebar Hint -->
		{#if showSpacebarHint && !showWingmanModal}
			<div
				class="fixed top-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/40 pl-4 pr-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md shadow-lg transition-all hover:bg-black/50"
			>
				<div class="flex items-center gap-2">
					<span
						class="flex h-5 items-center rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] text-white shadow-sm"
						>SPACE</span
					>
					<span>for Wingman</span>
				</div>
				<button
					onclick={() => (showSpacebarHint = false)}
					class="ml-1 rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
					aria-label="Dismiss hint"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			</div>
		{/if}

		<!-- Mood Overlay -->
		<MoodOverlay />
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center bg-slate-900">
		<div class="text-center text-white">
			<p class="text-slate-400">Initializing session...</p>
		</div>
	</div>
{/if}

<style>
	@keyframes scale-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	:global(.animate-scale-in) {
		animation: scale-in 0.2s ease-out;
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translate(-50%, -20px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	:global(.animate-slide-down) {
		animation: slide-down 0.3s ease-out;
	}
</style>
