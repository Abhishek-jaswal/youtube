'use client';
import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    if (!topic.trim()) return alert('Please enter a topic');
    setLoading(true);
    const res = await fetch('/api/script', {
      method: 'POST',
      body: JSON.stringify({ topic }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setScript(data.script);
    setLoading(false);
  };
  function playVoice(text: string) {
  const audio = new Audio(
    `https://api.voicerss.org/?key=YOUR_API_KEY&hl=en-us&src=${encodeURIComponent(text)}`
  );
  audio.play();
}


  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎥 YouTube Script Generator</h1>
      <input
        className="border p-2 w-full rounded mb-4"
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a video topic"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={generateScript}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Script'}
      </button>
      {script && (
        <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {script}
        </div>
      )}
      <button
  onClick={() => playVoice(script)}
  className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
>
  ▶️ Play Voice
</button>

    </main>
  );
}
