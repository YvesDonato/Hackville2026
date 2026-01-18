<script lang="ts">
	import { elevenLabsService, ElevenLabsService } from '$lib/services/elevenLabs';
	import SectionCard from '$lib/components/SectionCard.svelte';

	let text = $state('');
	let selectedVoice = $state(ElevenLabsService.VOICES.FEMALE);
	let isLoading = $state(false);
	let error = $state('');
	let audioUrl = $state<string | null>(null);
	let userApiKey = $state('');
	let showApiKeyInput = $state(!elevenLabsService.hasApiKey());

	const voices = [
		{ id: ElevenLabsService.VOICES.FEMALE, name: 'Clear Female (Rachel)' },
		{ id: ElevenLabsService.VOICES.MALE, name: 'Clear Male (Adam)' }
	];

	function handleApiKeySubmit() {
		if (userApiKey.trim()) {
			elevenLabsService.setApiKey(userApiKey.trim());
			showApiKeyInput = false;
			error = '';
		}
	}

	async function handleSpeak() {
		if (!text.trim()) return;

		isLoading = true;
		error = '';
		audioUrl = null;

		try {
			const blob = await elevenLabsService.convertTextToSpeech(text, selectedVoice);
			audioUrl = URL.createObjectURL(blob);
		} catch (e: any) {
			console.error(e);
			error = e.message || 'Something went wrong. Please check your API key and try again.';
			if (error.includes('API Key')) {
				showApiKeyInput = true;
			}
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="text-3xl font-bold text-slate-800">Text Mentor</h1>
		<p class="mt-2 text-lg text-slate-600">
			Listen to messages in a clear, calm voice to help process tone and meaning.
		</p>
	</div>

	{#if showApiKeyInput}
		<div class="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
			<h2 class="mb-2 text-lg font-semibold text-slate-800">API Key Required</h2>
			<p class="mb-4 text-slate-600">
				To use the high-quality Neural Voices, please enter your ElevenLabs API Key. 
				This is stored only in your browser session.
			</p>
			<div class="flex gap-2">
				<input
					type="password"
					bind:value={userApiKey}
					placeholder="Enter xi-api-key..."
					class="w-full rounded-lg border-slate-200 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
				/>
				<button
					onclick={handleApiKeySubmit}
					class="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700"
				>
					Save
				</button>
			</div>
		</div>
	{/if}

	<SectionCard
		eyebrow="Input"
		title="What would you like to hear?"
		description="Paste a text message or type a thought below."
	>
		<div class="space-y-6">
			<textarea
				bind:value={text}
				placeholder="Type something here..."
				rows="5"
				class="w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-lg leading-relaxed text-slate-800 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
			></textarea>

			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div class="flex items-center gap-4">
					<span class="text-sm font-medium text-slate-600">Voice:</span>
					<div class="flex rounded-lg bg-slate-100 p-1">
						{#each voices as voice}
							<button
								class="rounded-md px-4 py-2 text-sm font-medium transition-all {selectedVoice ===
								voice.id
									? 'bg-white text-indigo-700 shadow-sm'
									: 'text-slate-600 hover:text-slate-900'}"
								onclick={() => (selectedVoice = voice.id)}
							>
								{voice.name}
							</button>
						{/each}
					</div>
				</div>

				<button
					onclick={handleSpeak}
					disabled={isLoading || !text.trim()}
					class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if isLoading}
						<svg
							class="h-5 w-5 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Generating...
					{:else}
						Read Aloud
					{/if}
				</button>
			</div>

			{#if error}
				<div class="rounded-lg bg-red-50 p-4 text-center text-red-600">
					{error}
				</div>
			{/if}

			{#if audioUrl}
				<div class="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-6 text-center animate-fade-in">
					<p class="mb-3 text-sm font-medium text-indigo-800">Audio Ready</p>
					<audio controls autoplay src={audioUrl} class="w-full">
						Your browser does not support the audio element.
					</audio>
				</div>
			{/if}
		</div>
	</SectionCard>
</div>

<style>
	/* Minimal fade animation */
	@keyframes fade-in {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fade-in {
		animation: fade-in 0.3s ease-out forwards;
	}
</style>
