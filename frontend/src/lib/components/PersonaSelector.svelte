<script lang="ts">
	import type { Persona } from '$lib/types';
	import { personas } from '$lib/data/personas';

	let { selected = $bindable<Persona | null>(null) }: { selected?: Persona | null } = $props();

	function selectPersona(id: Persona) {
		selected = id;
	}
</script>

<div class="space-y-4">
	{#each personas as persona}
		<button
			type="button"
			onclick={() => selectPersona(persona.id)}
			class="w-full rounded-xl border-2 p-4 text-left transition-all {selected === persona.id
				? 'border-indigo-500 bg-indigo-50'
				: 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'}"
		>
			<div class="flex items-center gap-4">
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full {persona.color}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
						/>
					</svg>
				</div>
				<div class="flex-1">
					<div class="font-semibold text-slate-800">{persona.name}</div>
					<div class="text-xs text-slate-500">{persona.description}</div>
				</div>
				{#if selected === persona.id}
					<div class="text-indigo-600">●</div>
				{/if}
			</div>
		</button>
	{/each}
</div>
