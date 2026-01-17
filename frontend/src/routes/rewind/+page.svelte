<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import SectionCard from '$lib/components/SectionCard.svelte';
	import InfoPill from '$lib/components/InfoPill.svelte';

	const rubricScores = [
		{ label: 'Warmth', value: '8.6 / 10' },
		{ label: 'Clarity', value: '7.9 / 10' },
		{ label: 'Eye Contact', value: '8.1 / 10' },
		{ label: 'Pacing', value: '7.4 / 10' }
	];

	const rewindHighlights = [
		{
			time: '00:04:12',
			title: 'Steady introduction',
			description: 'You greeted confidently and kept a relaxed posture.'
		},
		{
			time: '00:07:48',
			title: 'Eye contact dip',
			description: 'A reminder banner would help re-center your gaze.'
		},
		{
			time: '00:11:03',
			title: 'Tone warmth boost',
			description: 'Your tone brightened when you asked a follow-up question.'
		}
	];

	const transcriptLines = [
		{
			speaker: 'AI Coach',
			line: 'How did you feel when you first walked in?'
		},
		{
			speaker: 'User',
			line: 'A little nervous, but I used the breathing cue.'
		},
		{
			speaker: 'AI Coach',
			line: 'That self-awareness shows. Great work noticing the shift.'
		}
	];
</script>

<AppShell
	title="The Rewind"
	subtitle="A calm recap of your session with timestamped highlights and supportive language."
	primaryCta={{ label: 'Save Session', href: '/' }}
	secondaryCta={{ label: 'Start Another', href: '/lab' }}
>
	<div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
		<div class="space-y-6">
			<SectionCard
				eyebrow="Scores"
				title="Rubric snapshot"
				description="A shame-free breakdown of your strengths and growth edges."
			>
				<div class="grid gap-3">
					{#each rubricScores as score}
						<InfoPill label={score.label} value={score.value} />
					{/each}
				</div>
			</SectionCard>

			<SectionCard
				eyebrow="Transcript"
				title="Session playback"
				description="Every line is time-stamped for quick reflection."
			>
				<div class="space-y-4">
					{#each transcriptLines as line}
						<div class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
							<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{line.speaker}</p>
							<p class="mt-2 text-sm text-slate-700">{line.line}</p>
						</div>
					{/each}
				</div>
			</SectionCard>
		</div>

		<div class="space-y-6">
			<SectionCard
				eyebrow="Highlights"
				title="Moments for growth"
				description="Screenshots and cues help you revisit key moments."
			>
				<div class="space-y-4">
					{#each rewindHighlights as highlight}
						<div class="rounded-2xl border border-slate-100 bg-white px-4 py-4">
							<div class="flex items-center justify-between text-xs text-slate-400">
								<span class="font-semibold uppercase tracking-[0.2em]">{highlight.time}</span>
								<span>Screenshot</span>
							</div>
							<div class="mt-3 h-24 rounded-2xl border border-dashed border-slate-200 bg-slate-50"></div>
							<p class="mt-3 text-sm font-semibold text-slate-800">{highlight.title}</p>
							<p class="mt-2 text-sm text-slate-600">{highlight.description}</p>
						</div>
					{/each}
				</div>
			</SectionCard>

			<SectionCard
				eyebrow="Next steps"
				title="Gentle focus areas"
				description="Suggested micro-practices before your next session."
			>
				<ul class="space-y-3 text-sm text-slate-600">
					<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
						Practice holding eye contact for 3-second intervals.
					</li>
					<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
						Try a grounding breath before answering new questions.
					</li>
					<li class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
						Ask one reflective follow-up per response.
					</li>
				</ul>
			</SectionCard>
		</div>
	</div>
</AppShell>
