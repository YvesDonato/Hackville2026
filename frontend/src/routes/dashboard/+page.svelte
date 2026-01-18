<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="flex min-h-screen flex-col bg-slate-50">
	<header class="w-full bg-white px-6 py-4 shadow-sm">
		<a href="/" class="inline-flex items-center">
			<Logo class="h-10 w-auto" />
		</a>
	</header>

	<div class="animate-slide-in flex flex-1 flex-col items-center justify-center gap-10 px-6">
		<h1 class="text-5xl font-semibold text-slate-800">Welcome to NeuRizz</h1>
		<div class="flex flex-col gap-4 sm:flex-row">
			<button
				class="text-2xl text-center font-medium w-70 p-3 drop-shadow-xl rounded-full bg-lblue"
				onclick={() => goto('/lab')}
			>
				Rizz
			</button>
			<button
				class="text-2xl text-center font-medium w-70 p-3 drop-shadow-xl rounded-full bg-lblue"
				onclick={() => goto('/textMentor')}
			>
				Reword
			</button>
		</div>
	</div>
</div>
