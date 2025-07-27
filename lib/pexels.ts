export async function getVisuals(query: string) {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=3`, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY!,
    },
  });

  const data = await response.json();
  return data.photos || [];
}
