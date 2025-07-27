// /app/api/voice/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();

  const url = `https://api.voicerss.org/?key=${process.env.VOICERSS_API_KEY}&hl=en-us&c=MP3&f=44khz_16bit_stereo&src=${encodeURIComponent(
    text
  )}`;

  const audioRes = await fetch(url);
  const audioBuffer = await audioRes.arrayBuffer();

  return new NextResponse(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  });
}
