import { GoogleGenAI } from '@google/genai';
import { env } from '$env/dynamic/public';
import type { TranscriptEntry, Scenario, Persona } from '$lib/types';

export interface AnalysisResult {
	score: number;
	strengths: string[];
	improvements: string[];
}

const ANALYSIS_PROMPT = `You are an expert social skills coach specializing in helping neurodivergent individuals improve their dating and social interaction skills.

Analyze the following conversation transcript from a practice dating session. The user (marked as "user") is practicing their social skills with an AI persona (marked as "ai").

Context:
- Scenario: {scenario}
- AI Persona: {persona}

Transcript:
{transcript}

Based on this conversation, provide personalized feedback:

1. SCORE (0-100): Rate the user's overall social performance.
   - 90-100: Excellent, natural, engaging
   - 70-89: Good, minor awkwardness but solid
   - 50-69: Average, some missed cues or awkward moments
   - 0-49: Needs significant improvement

2. STRENGTHS (3 items): What did the user do well? Look for:
   - Good conversation flow and turn-taking
   - Asking follow-up questions
   - Showing genuine interest
   - Appropriate emotional responses
   - Clear and coherent communication
   - Recovery from awkward moments
   - Use of humor when appropriate

3. IMPROVEMENTS (2 items): What could the user improve? Look for:
   - Missed opportunities for follow-up questions
   - One-word or too-brief responses
   - Overly long monologues
   - Topic changes that felt abrupt
   - Missed social cues
   - Areas where more engagement would help

IMPORTANT: Be specific and reference actual moments from the conversation when possible. Be encouraging and constructive - this is meant to build confidence.

Respond in this exact JSON format:
{
  "score": 85,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2"]
}`;

export async function analyzeTranscript(
	transcript: TranscriptEntry[],
	scenario: Scenario,
	persona: Persona
): Promise<AnalysisResult> {
	const apiKey = env.PUBLIC_GEMINI_API_KEY;
	if (!apiKey) {
		throw new Error('PUBLIC_GEMINI_API_KEY environment variable is not set');
	}

	// Skip analysis if transcript is too short
	if (transcript.length < 2) {
		throw new Error('Transcript too short for meaningful analysis');
	}

	const ai = new GoogleGenAI({ apiKey });

	// Format transcript for the prompt
	const transcriptText = transcript
		.map((entry) => `[${entry.speaker.toUpperCase()}]: ${entry.text}`)
		.join('\n');

	const prompt = ANALYSIS_PROMPT.replace('{scenario}', scenario)
		.replace('{persona}', persona)
		.replace('{transcript}', transcriptText);

	const response = await ai.models.generateContent({
		model: 'gemini-2.0-flash',
		contents: prompt,
		config: {
			responseMimeType: 'application/json'
		}
	});

	const text = response.text;
	if (!text) {
		throw new Error('Empty response from Gemini');
	}

	const parsed = JSON.parse(text) as AnalysisResult;

	// Validate response structure
	if (typeof parsed.score !== 'number' || !Array.isArray(parsed.strengths) || !Array.isArray(parsed.improvements)) {
		throw new Error('Invalid response structure from Gemini');
	}

	return parsed;
}
