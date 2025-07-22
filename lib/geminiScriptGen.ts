export async function generateGeminiScript(topic: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Write a 2-minute YouTube video script on the topic: "${topic}". Make it engaging, informative, and with a clear hook and ending.`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();

  if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }

  console.error('❌ Gemini returned:', JSON.stringify(data, null, 2));
  return '// Gemini returned no content';
}
