import { env } from '$env/dynamic/public';

export class ElevenLabsService {
  private apiKey: string;
  private baseUrl = "https://api.elevenlabs.io/v1";

  // Standard stable voices
  public static VOICES = {
    FEMALE: "21m00Tcm4TlvDq8ikWAM", // Rachel
    MALE: "pNInz6obpgDQGcFmaJgB",   // Adam
  };

  constructor(apiKey?: string) {
    this.apiKey = apiKey || env.PUBLIC_ELEVENLABS_API_KEY || import.meta.env.VITE_ELEVENLABS_API_KEY || "";
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  hasApiKey(): boolean {
    return !!this.apiKey;
  }

  async convertTextToSpeech(text: string, voiceId: string): Promise<Blob> {
    if (!this.apiKey) {
      throw new Error("Missing ElevenLabs API Key");
    }

    const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": this.apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail?.message || "Failed to convert text to speech");
    }

    return await response.blob();
  }
}

export const elevenLabsService = new ElevenLabsService();
