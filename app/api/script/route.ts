import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiScript } from '@/lib/geminiScriptGen';

export async function POST(req: NextRequest) {
  const { topic } = await req.json();
  const script = await generateGeminiScript(topic);
  return NextResponse.json({ script });
}
