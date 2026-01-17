<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import type { SessionStats } from '$lib/types';
	import { sessionStats, sessionConfig } from '$lib/stores/session';
	import { clearTranscript } from '$lib/stores/transcript';
	import StrengthsList from '$lib/components/StrengthsList.svelte';
	import ImprovementsList from '$lib/components/ImprovementsList.svelte';
	import TranscriptViewer from '$lib/components/TranscriptViewer.svelte';

	let stats = $state<SessionStats | null>(null);

	onMount(() => {
		stats = get(sessionStats);
		if (!stats) {
			goto('/lab');
		}
	});

	function formatDuration(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function practiceAgain() {
		sessionStats.set(null);
		sessionConfig.set(null);
		clearTranscript();
		goto('/lab');
	}

	function saveReport() {
		sessionStats.set(null);
		sessionConfig.set(null);
		clearTranscript();
		goto('/');
	}
</script>

{#if stats}
	<div class="min-h-screen overflow-y-auto bg-pastel-slate p-6 md:p-12">
		<div class="animate-slide-in mx-auto max-w-4xl space-y-8">
			<!-- Header -->
			<div class="mb-10 space-y-2 text-center">
				<h1 class="text-4xl font-extrabold tracking-tight text-slate-800">The Rewind</h1>
				<p class="text-lg text-slate-500">Here is a breakdown of your social vibe.</p>
				<p class="text-sm text-slate-400">Session duration: {formatDuration(stats.duration)}</p>
			</div>

			<!-- Qualitative Feedback Columns -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<StrengthsList strengths={stats.strengths} />
				<ImprovementsList improvements={stats.improvements} />
			</div>

			<!-- Transcript Viewer -->
			<div class="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
				<div class="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 p-6">
					<!-- Message square icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-slate-400"
					>
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
					<h3 class="font-semibold text-slate-700">Full Transcript</h3>
				</div>
				<TranscriptViewer entries={stats.transcript} />
			</div>

			<!-- Actions -->
			<div class="flex flex-col justify-center gap-4 pb-12 pt-4 md:flex-row">
				<button
					type="button"
					onclick={practiceAgain}
					class="flex transform items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-black hover:shadow-xl"
				>
					<!-- Refresh icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
						<path d="M21 3v5h-5" />
						<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
						<path d="M8 16H3v5" />
					</svg>
					<span>Practice Again</span>
				</button>
				<button
					type="button"
					onclick={saveReport}
					class="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition-all hover:bg-slate-50"
				>
					<!-- Download icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="7 10 12 15 17 10" />
						<line x1="12" x2="12" y1="15" y2="3" />
					</svg>
					<span>Save Report</span>
				</button>
			</div>
		</div>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center bg-slate-50">
		<div class="text-center">
			<p class="text-slate-500">Loading session data...</p>
		</div>
	</div>
{/if}
