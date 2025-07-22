// lib/geminiScriptGen.ts

export async function generateGeminiScript(topic) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Write a 2-minute YouTube video script on the topic: "${topic}". Make it engaging, informative, with a strong hook and a clear ending.`,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();

  if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }

  console.error('🔍 Gemini full response:', JSON.stringify(data, null, 2));
  return '// ⚠️ Gemini did not return content.';
}
