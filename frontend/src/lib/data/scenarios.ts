import type { Scenario } from '$lib/types';

export interface ScenarioInfo {
	id: Scenario;
	name: string;
	description: string;
	icon: 'coffee' | 'utensils' | 'video';
}

export const scenarios: ScenarioInfo[] = [
	{
		id: 'coffee_shop',
		name: 'Coffee Shop',
		description: 'Casual low-pressure intro with gentle ambient noise.',
		icon: 'coffee'
	},
	{
		id: 'restaurant',
		name: 'Dinner Date',
		description: 'Seated conversation with pacing and table etiquette cues.',
		icon: 'utensils'
	},
	{
		id: 'video_call',
		name: 'Video Call',
		description: 'Camera framing, eye contact, and virtual presence coaching.',
		icon: 'video'
	}
];

export function getScenarioById(id: Scenario): ScenarioInfo | undefined {
	return scenarios.find((s) => s.id === id);
}

export function getScenarioDisplayName(id: Scenario): string {
	const scenario = getScenarioById(id);
	return scenario?.name ?? id.replace('_', ' ');
}
