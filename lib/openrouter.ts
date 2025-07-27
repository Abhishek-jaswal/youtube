export async function generateScriptFromOpenRouter(topic: string) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000', // Replace on deployment
      'X-Title': 'YouTube Script Generator',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Write a full YouTube script on the topic: "${topic}". Include a hook, body, and call to action.`,
        },
      ],
    }),
  });

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  return content || '⚠️ No script returned.';
}
