// app/api/trends/route.ts

import { NextResponse } from 'next/server';
import { getTrendingTopics } from '@/lib/trendFetch';

export async function GET() {
  const topics = await getTrendingTopics('AI');
  return NextResponse.json({ topics });
}
