import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Generate a 1-minute YouTube script on the topic: "${topic}"`
          }
        ]
      })
    });

    const data = await response.json();
    console.log("OpenRouter response:", data);

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ error: "No choices returned from OpenRouter" }, { status: 500 });
    }

    const script = data.choices[0].message.content;
    return NextResponse.json({ script });

  } catch (err) {
    console.error("Script generation error:", err);
    return NextResponse.json({ error: "Script generation failed" }, { status: 500 });
  }
}
