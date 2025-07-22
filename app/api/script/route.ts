// app/api/script/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiScript } from '@/lib/geminiScriptGen';

export async function POST(req) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
  }

  const script = await generateGeminiScript(topic);
  return NextResponse.json({ script });
}
