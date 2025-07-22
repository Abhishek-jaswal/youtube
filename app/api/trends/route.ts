import { NextResponse } from 'next/server';
import { getTrendingTopics } from '@/lib/trendFetch';

export async function GET() {
  const topics = await getTrendingTopics("AI"); // you can change keyword dynamically later
  return NextResponse.json({ topics });
}
