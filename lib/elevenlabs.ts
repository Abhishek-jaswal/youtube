// lib/elevenlabs.ts
import axios from "axios";

export const generateVoiceElevenLabs = async (text: string): Promise<Blob> => {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel (default voice)

  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    },
    {
      headers: {
        "xi-api-key": apiKey!,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      responseType: "blob",
    }
  );

  return response.data;
};
