// app/api/tts/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text, voice } = await req.json();

  const formData = new URLSearchParams();
  formData.append('msg', text);
  formData.append('lang', voice || 'Joey'); // Voice like 'Joey', 'Amy'
  formData.append('source', 'ttsmp3');

  const response = await fetch('https://ttsmp3.com/makemp3_new.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const data = await response.json();
  return NextResponse.json({ audioUrl: data.URL });
}
