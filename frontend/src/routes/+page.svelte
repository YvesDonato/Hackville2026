<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import SectionCard from '$lib/components/SectionCard.svelte';

	const featureHighlights = [
		{
			title: 'Mentorship Engine',
			description:
				'AI-led practice sessions that simulate real conversations with tailored partner profiles.'
		},
		{
			title: 'Cognitive Load Balancer',
			description:
				'Soft visual guardrails and pacing reminders so users stay grounded and in control.'
		},
		{
			title: 'Shame-Free Rewind',
			description:
				'Post-session analytics with gentle language, progress trends, and reflection prompts.'
		}
	];

	const missionPoints = [
		{
			title: 'Problem',
			description:
				'High-stakes social moments can trigger executive dysfunction and overwhelm for neurodivergent users.'
		},
		{
			title: 'Mission',
			description:
				'Turn social interaction into a practiced, low-pressure skill with real-time coaching.'
		}
	];
</script>

<AppShell
	title="everyone deserves a fine shyt"
	subtitle="NeuRizz is a mentorship and date-prep platform that supports neurodivergent and autistic users with real-time feedback, AI coaching, and gentle guidance."
	primaryCta={{ label: 'Enter the Lab', href: '/lab' }}
	secondaryCta={{ label: 'See a Demo Session', href: '/session' }}
>
	<div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
		<SectionCard
			eyebrow="Mission"
			title="A calm, practiced approach to social confidence"
			description="We reduce social latency by blending biometric cues with language coaching in a sensory-safe way."
		>
			<div class="grid gap-4 sm:grid-cols-2">
				{#each missionPoints as point}
					<div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
						<p class="text-sm font-semibold text-slate-800">{point.title}</p>
						<p class="mt-2 text-sm text-slate-600">{point.description}</p>
					</div>
				{/each}
			</div>
		</SectionCard>

		<SectionCard
			eyebrow="Live Signals"
			title="Real-time cues without the pressure"
			description="Soft banners, posture metrics, and tone coaching update as the session flows."
		>
			<ul class="space-y-3 text-sm text-slate-600">
				<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
					<span class="font-semibold text-slate-800">Visual Guardrails:</span> pastel banners prompt eye contact and
					posture adjustments.
				</li>
				<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
					<span class="font-semibold text-slate-800">Biometric Scoring:</span> posture, facial expression, and gaze
					tracking with MediaPipe or Gemini Vision.
				</li>
				<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
					<span class="font-semibold text-slate-800">Linguistic Analysis:</span> pacing and tone rewrites keep
					conversation balanced.
				</li>
			</ul>
		</SectionCard>
	</div>

	<SectionCard
		eyebrow="Core Features"
		title="Mentorship engine highlights"
		description="Pick a partner profile, choose a scenario, and rehearse with real-time coaching."
	>
		<div class="grid gap-4 md:grid-cols-3">
			{#each featureHighlights as feature}
				<div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
					<p class="text-sm font-semibold text-slate-800">{feature.title}</p>
					<p class="mt-2 text-sm text-slate-600">{feature.description}</p>
				</div>
			{/each}
		</div>
	</SectionCard>

	<SectionCard
		eyebrow="Architecture"
		title="Built for accessibility and low latency"
		description="SvelteKit + Tailwind on the frontend, Gemini Live for audio coaching, and MongoDB Atlas for session history."
	>
		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-2xl border border-slate-100 bg-white px-4 py-4">
				<p class="text-sm font-semibold text-slate-800">Frontend</p>
				<p class="mt-2 text-sm text-slate-600">SvelteKit, Tailwind CSS, and accessible UI patterns.</p>
			</div>
			<div class="rounded-2xl border border-slate-100 bg-white px-4 py-4">
				<p class="text-sm font-semibold text-slate-800">AI &amp; Storage</p>
				<p class="mt-2 text-sm text-slate-600">
					Gemini Live API, Google AI Studio prompt prototyping, MongoDB Atlas storage.
				</p>
			</div>
		</div>
	</SectionCard>
</AppShell>
