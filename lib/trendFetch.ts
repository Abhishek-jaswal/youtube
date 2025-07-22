// lib/trendFetch.ts

export async function getTrendingTopics(keyword = "AI") {
  try {
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(keyword)}`
    );
    const data = await response.json();
    return data[1];
  } catch (error) {
    console.error("❌ Failed to fetch trending topics:", error);
    return [];
  }
}
