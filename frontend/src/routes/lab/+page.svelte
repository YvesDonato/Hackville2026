<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import SectionCard from '$lib/components/SectionCard.svelte';

	const profiles = [
		{
			name: 'Male',
			description: 'Supportive small talk, steady pace, calm humor.'
		},
		{
			name: 'Female',
			description: 'Curious energy, expressive tone, thoughtful follow-ups.'
		},
		{
			name: 'Discord Kitten',
			description: 'Playful online vibe, memes, and unexpected tangents.'
		}
	];

	const scenarios = [
		{
			name: 'Coffee Shop',
			description: 'Casual low-pressure intro with gentle ambient noise.'
		},
		{
			name: 'Restaurant',
			description: 'Seated conversation with pacing and table etiquette cues.'
		},
		{
			name: 'Video Call',
			description: 'Camera framing, eye contact, and virtual presence coaching.'
		}
	];
</script>

<AppShell
	title="The Lab"
	subtitle="Choose a partner profile and scenario to start a guided practice session."
	primaryCta={{ label: 'Start Session', href: '/session' }}
	secondaryCta={{ label: 'Back to Landing', href: '/' }}
>
	<div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
		<SectionCard
			eyebrow="Partner Profile"
			title="Pick a mentorship personality"
			description="Each profile adjusts tone, pacing, and prompts to match your comfort level."
		>
			<div class="grid gap-4">
				{#each profiles as profile}
					<div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
						<p class="text-sm font-semibold text-slate-800">{profile.name}</p>
						<p class="mt-2 text-sm text-slate-600">{profile.description}</p>
					</div>
				{/each}
			</div>
		</SectionCard>

		<SectionCard
			eyebrow="Scenario"
			title="Set the environment"
			description="Practice in common date settings with tailored cues."
		>
			<div class="grid gap-4">
				{#each scenarios as scenario}
					<div class="rounded-2xl border border-slate-100 bg-white px-4 py-4">
						<p class="text-sm font-semibold text-slate-800">{scenario.name}</p>
						<p class="mt-2 text-sm text-slate-600">{scenario.description}</p>
					</div>
				{/each}
			</div>
		</SectionCard>
	</div>

	<SectionCard
		eyebrow="Session Prep"
		title="What to expect"
		description="The AI greets you, asks a warm-up question, and starts tracking speech and body cues."
	>
		<ul class="grid gap-4 text-sm text-slate-600 md:grid-cols-3">
			<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
				<span class="font-semibold text-slate-800">Warm prompt:</span> “What does a perfect day look like?”
			</li>
			<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
				<span class="font-semibold text-slate-800">Live feedback:</span> banners, tone pacing, and gaze cues.
			</li>
			<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
				<span class="font-semibold text-slate-800">Gentle rewind:</span> timestamped moments for reflection.
			</li>
		</ul>
	</SectionCard>
</AppShell>
