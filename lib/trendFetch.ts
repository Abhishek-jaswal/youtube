// lib/trendFetch.ts

export async function getTrendingTopics(keyword = "AI"): Promise<string[]> {
  try {
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(keyword)}`
    );
    const data = await response.json();
    const suggestions = data[1] as string[];
    return suggestions;
  } catch (error) {
    console.error("Failed to fetch trending topics:", error);
    return [];
  }
}
