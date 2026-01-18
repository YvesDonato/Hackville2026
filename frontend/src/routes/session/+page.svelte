<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import type { FeedbackMetric, SessionStats, SessionConfig } from '$lib/types';
	import { sessionConfig, sessionStats, sessionStartTime } from '$lib/stores/session';
	import { transcript, addTranscriptEntry, clearTranscript } from '$lib/stores/transcript';
	import { currentFeedback, setFeedback, clearFeedback } from '$lib/stores/feedback';
	import { LiveSessionClient } from '$lib/services/liveClient';
	import { analyzeTranscript } from '$lib/services/transcriptAnalyzer';
	import { getPersonaDisplayName } from '$lib/data/personas';
	import { getScenarioDisplayName } from '$lib/data/scenarios';
	import SessionControls from '$lib/components/SessionControls.svelte';
	import ThrelteScene from '$lib/components/ThrelteScene.svelte';

	let videoRef: HTMLVideoElement | null = $state(null);
	let isConnected = $state(false);
	let isAnalyzing = $state(false);
	let micActive = $state(true);
	let client: LiveSessionClient | null = null;
	let videoStream: MediaStream | null = null;
	let feedbackInterval: number | null = null;

	let config = $state<SessionConfig | null>(null);
	let personaName = $state('');
	let scenarioName = $state('');
	let personaKey = $state<SessionConfig['persona'] | null>(null);

	// Mock stats generator
	function generateMockStats(): SessionStats {
		const currentTranscript = get(transcript);
		const startTime = get(sessionStartTime) || Date.now();
		const duration = Math.floor((Date.now() - startTime) / 1000);

		const strengthsPool = [
			'You maintained a warm and inviting tone throughout the conversation.',
			'Your pacing was excellent - not too fast, not too slow.',
			'You asked thoughtful follow-up questions that showed genuine interest.',
			'Your body language appeared open and engaged.',
			'You handled pauses naturally without rushing to fill silence.',
			'Your responses were well-structured and easy to follow.'
		];

		const improvementsPool = [
			'Try maintaining eye contact for slightly longer periods.',
			'Consider taking a breath before responding to complex questions.',
			'Practice active listening cues like nodding or brief verbal affirmations.',
			'Work on varying your vocal tone to add more expressiveness.',
			'Try to relax your shoulders during intense moments.'
		];

		// Random selection
		const shuffledStrengths = [...strengthsPool].sort(() => Math.random() - 0.5);
		const shuffledImprovements = [...improvementsPool].sort(() => Math.random() - 0.5);

		return {
			duration,
			strengths: shuffledStrengths.slice(0, 3),
			improvements: shuffledImprovements.slice(0, 2),
			transcript: currentTranscript
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
					type: 'eye_contact',
					message: 'Gentle reminder: Try to look at the camera.',
					severity: 'info'
				});
			} else if (r > 0.9 && r < 0.92) {
				setFeedback({
					timestamp: Date.now(),
					type: 'pacing',
					message: 'Great pacing! You are speaking clearly.',
					severity: 'success'
				});
			} else if (r < 0.05) {
				setFeedback({
					timestamp: Date.now(),
					type: 'posture',
					message: 'Relax your shoulders, take a deep breath.',
					severity: 'info'
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
			videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
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
			}
		);


			isConnected = true;
			startFeedbackLoop();
		} catch (err) {
			console.error('Failed to init session:', err);
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
				throw new Error('Session config not found');
			}

			// Call Gemini for analysis
			const analysis = await analyzeTranscript(
				currentTranscript,
				currentConfig.scenario,
				currentConfig.persona
			);

			const stats: SessionStats = {
				duration,
				strengths: analysis.strengths,
				improvements: analysis.improvements,
				transcript: currentTranscript
			};

			sessionStats.set(stats);
		} catch (error) {
			console.error('Analysis failed:', error);

			// Fallback to empty feedback
			const stats: SessionStats = {
				duration,
				strengths: ['Session too short'],
				improvements: ['Session too short'],
				transcript: currentTranscript
			};
			sessionStats.set(stats);
		}

		goto('/rewind');
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
			goto('/lab');
			return;
		}
		personaName = getPersonaDisplayName(config.persona);
		scenarioName = getScenarioDisplayName(config.scenario);
		personaKey = config.persona;
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
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95">
			<div class="space-y-6 text-center">
				<div class="relative">
					<div
						class="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500"
					></div>
				</div>
				<div class="space-y-2">
					<h2 class="text-xl font-semibold text-white">Analyzing Your Session</h2>
					<p class="text-sm text-slate-400">AI is reviewing your conversation...</p>
				</div>
			</div>
		</div>
	{/if}

	<div class="relative flex h-screen flex-col overflow-hidden bg-slate-900 text-white">
		<!-- Top Bar -->
		<div
			class="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4"
		>
			<div class="flex items-center gap-2">
				<span
					class="h-2 w-2 rounded-full {isConnected ? 'animate-pulse bg-red-500' : 'bg-slate-500'}"
				></span>
				<span class="text-sm font-medium uppercase tracking-wide opacity-80">
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
				<div class="relative overflow-hidden rounded-xl border-2 border-white/20 shadow-2xl">
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
			<div class="relative z-10 flex flex-col items-center justify-center p-8 text-center">
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
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
					{/if}
				</div>
				<h2 class="mb-2 text-2xl font-light tracking-tight">
					{personaName}
					{#if config.persona === 'discord_kitten'}
						<span>&#128572;</span>
					{/if}
				</h2>
				<p class="max-w-xs text-sm text-indigo-200/60">
					{isConnected ? 'Listening & Analyzing...' : 'Connecting...'}
				</p>
			</div>

			<!-- Visual Guardrail / Feedback Banner -->
			{#if feedback}
				<div
					class="animate-fade-in absolute bottom-32 left-1/2 z-30 -translate-x-1/2 rounded-2xl px-6 py-3 shadow-lg backdrop-blur-md transition-all duration-500
					{feedback.severity === 'info' ? 'border border-blue-400/30 bg-blue-500/20 text-blue-100' : ''}
					{feedback.severity === 'warning' ? 'border border-amber-400/30 bg-amber-500/20 text-amber-100' : ''}
					{feedback.severity === 'success' ? 'border border-emerald-400/30 bg-emerald-500/20 text-emerald-100' : ''}"
				>
					<div class="flex items-center gap-3">
						{#if feedback.type === 'eye_contact'}
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
						{:else if feedback.type === 'posture'}
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
								<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
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
						<span class="text-sm font-medium">{feedback.message}</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Controls Bar -->
		<SessionControls bind:micActive {isConnected} onEndSession={handleEndSession} />
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center bg-slate-900">
		<div class="text-center text-white">
			<p class="text-slate-400">Initializing session...</p>
		</div>
	</div>
{/if}
