<script lang="ts">
	import type { Scenario } from '$lib/types';
	import { scenarios } from '$lib/data/scenarios';

	let { selected = $bindable<Scenario | null>(null) }: { selected?: Scenario | null } = $props();

	function selectScenario(id: Scenario) {
		selected = id;
	}
</script>

<div class="space-y-4">
	{#each scenarios as scenario}
		<button
			type="button"
			onclick={() => selectScenario(scenario.id)}
			class="w-full rounded-xl border-2 p-4 text-left transition-all {selected === scenario.id
				? 'border-emerald-500 bg-emerald-50'
				: 'border-white bg-white hover:border-slate-200'}"
		>
			<div class="flex items-center gap-4">
				<div
					class="flex items-center justify-center rounded-full p-3 {selected === scenario.id
						? 'bg-emerald-100 text-emerald-600'
						: 'bg-slate-100 text-slate-500'}"
				>
					{#if scenario.icon === 'coffee'}
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
							<path d="M10 2v2" />
							<path d="M14 2v2" />
							<path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
							<path d="M6 2v2" />
						</svg>
					{:else if scenario.icon === 'utensils'}
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
							<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
							<path d="M7 2v20" />
							<path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
						</svg>
					{:else}
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
							<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
							<rect x="2" y="6" width="14" height="12" rx="2" />
						</svg>
					{/if}
				</div>
				<span class="font-medium text-slate-700">{scenario.name}</span>
				{#if selected === scenario.id}
					<div class="ml-auto text-emerald-600">●</div>
				{/if}
			</div>
		</button>
	{/each}
</div>
