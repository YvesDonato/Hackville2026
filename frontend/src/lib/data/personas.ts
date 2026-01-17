import type { Persona } from '$lib/types';

export interface PersonaInfo {
	id: Persona;
	name: string;
	description: string;
	color: string;
}

export const personas: PersonaInfo[] = [
	{
		id: 'male',
		name: 'Alex',
		description: 'Friendly, casual',
		color: 'bg-pastel-blue text-blue-600'
	},
	{
		id: 'female',
		name: 'Sarah',
		description: 'Warm, engaging',
		color: 'bg-pastel-rose text-rose-600'
	},
	{
		id: 'discord_kitten',
		name: 'Kitten',
		description: 'Chaotic, slang-heavy',
		color: 'bg-purple-100 text-purple-600'
	}
];

export function getPersonaById(id: Persona): PersonaInfo | undefined {
	return personas.find((p) => p.id === id);
}

export function getPersonaDisplayName(id: Persona): string {
	const persona = getPersonaById(id);
	if (!persona) return id;
	return id === 'discord_kitten' ? 'Kitten' : persona.name;
}
