<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import SectionCard from '$lib/components/SectionCard.svelte';
	import InfoPill from '$lib/components/InfoPill.svelte';
	import LiveFeedbackBanner from '$lib/components/LiveFeedbackBanner.svelte';

	const realtimeMetrics = [
		{ label: 'Posture', value: 'Stable' },
		{ label: 'Gaze', value: 'Camera aligned' },
		{ label: 'Facial', value: 'Open expression' },
		{ label: 'Tone', value: 'Warm + steady' }
	];

	const coachingPrompts = [
		'Hold eye contact for two breaths, then smile gently.',
		'Lower your shoulders and let your voice settle.',
		'Add one curiosity question before you answer.'
	];

	const sessionScript = [
		{
			role: 'AI Coach',
			line: 'Hey, I’m here to help you feel prepared. Ready to warm up?'
		},
		{
			role: 'User',
			line: 'Yes, let’s start.'
		},
		{
			role: 'AI Coach',
			line: 'What does a perfect day look like for you?'
		}
	];
</script>

<AppShell
	title="Active Session"
	subtitle="Live coaching with gentle visual guardrails and tone guidance."
	primaryCta={{ label: 'End Session', href: '/rewind' }}
	secondaryCta={{ label: 'Back to Lab', href: '/lab' }}
>
	<div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
		<div class="space-y-6">
			<SectionCard
				eyebrow="Live Feedback"
				title="Soft prompts, no sensory overload"
				description="Banners update every few seconds to keep you anchored."
			>
				<div class="space-y-3">
					{#each coachingPrompts as prompt}
						<LiveFeedbackBanner message={prompt} variant="reminder" />
					{/each}
				</div>
			</SectionCard>

			<SectionCard
				eyebrow="Conversation"
				title="Real-time dialogue flow"
				description="Practice with curated prompts and supportive pacing."
			>
				<div class="space-y-4">
					{#each sessionScript as line}
						<div class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
							<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{line.role}</p>
							<p class="mt-2 text-sm text-slate-700">{line.line}</p>
						</div>
					{/each}
				</div>
			</SectionCard>
		</div>

		<div class="space-y-6">
			<SectionCard
				eyebrow="Biometrics"
				title="Live signal snapshot"
				description="Streaming posture, gaze, facial, and tone cues."
			>
				<div class="grid gap-3">
					{#each realtimeMetrics as metric}
						<InfoPill label={metric.label} value={metric.value} />
					{/each}
				</div>
			</SectionCard>

			<SectionCard
				eyebrow="Tone Rewriting"
				title="Gentle rephrasing"
				description="Suggestions update to keep your voice open and inviting."
			>
				<div class="space-y-3 text-sm text-slate-600">
					<div class="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-emerald-900">
						Try: “That sounds fun. Tell me more about what you enjoyed.”
					</div>
					<div class="rounded-2xl border border-slate-100 bg-white px-4 py-3">
						Reframe: “I’m a little nervous, but I’m excited to be here.”
					</div>
				</div>
			</SectionCard>

			<SectionCard
				eyebrow="Squeaky-Voice"
				title="Optional anxiety diffuser"
				description="Negative self-talk can be replayed in a silly voice to reduce tension."
			>
				<div class="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
					<p class="text-sm text-slate-600">Enable squeaky replay</p>
					<button
						type="button"
						class="rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold text-slate-700"
					>
						Off
					</button>
				</div>
			</SectionCard>
		</div>
	</div>
</AppShell>
