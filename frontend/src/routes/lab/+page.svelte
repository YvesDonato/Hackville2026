<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Persona, Scenario } from '$lib/types';
	import { sessionConfig } from '$lib/stores/session';
	import { clearTranscript } from '$lib/stores/transcript';
	import PersonaSelector from '$lib/components/PersonaSelector.svelte';
	import ScenarioSelector from '$lib/components/ScenarioSelector.svelte';

	let selectedPersona = $state<Persona | null>(null);
	let selectedScenario = $state<Scenario | null>(null);

	function startSession() {
		if (selectedPersona && selectedScenario) {
			sessionConfig.set({ persona: selectedPersona, scenario: selectedScenario });
			clearTranscript();
			goto('/session');
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-slate-50 p-6">
	<div
		class="animate-slide-in flex min-h-[600px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:flex-row"
	>
		<!-- Left Panel: Persona -->
		<div
			class="flex flex-1 flex-col border-b border-slate-100 p-8 md:border-b-0 md:border-r md:p-12"
		>
			<h2 class="mb-6 text-2xl font-bold text-slate-800">1. Choose Partner</h2>
			<div class="flex-1">
				<PersonaSelector bind:selected={selectedPersona} />
			</div>
		</div>

		<!-- Right Panel: Scenario -->
		<div class="flex flex-1 flex-col bg-slate-50/50 p-8 md:p-12">
			<h2 class="mb-6 text-2xl font-bold text-slate-800">2. Set Scene</h2>
			<div class="flex-1">
				<ScenarioSelector bind:selected={selectedScenario} />
			</div>

			<div class="mt-8 border-t border-slate-200 pt-6">
				<button
					type="button"
					disabled={!selectedPersona || !selectedScenario}
					onclick={startSession}
					class="w-full rounded-xl bg-slate-900 py-4 font-bold text-white shadow-lg transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
				>
					Start Session
				</button>
			</div>
		</div>
	</div>
</div>
