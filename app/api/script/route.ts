// app/api/script/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateScriptFromOpenRouter } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  const script = await generateScriptFromOpenRouter(topic || 'AI in Education');
  return NextResponse.json({ script });
}
