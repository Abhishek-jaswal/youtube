export async function generateScriptFromOpenRouter(topic: string) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'YouTube Script Generator',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Write a full YouTube video script on the topic "${topic}". It should have an engaging hook, body, and call to action.`,
        },
      ],
    }),
  });

  const data = await res.json();
  console.log('OpenRouter Response:', JSON.stringify(data, null, 2)); // Debug

  const content = data?.choices?.[0]?.message?.content;
  return content || '⚠️ No script returned.';
}
