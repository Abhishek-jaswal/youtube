'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/trends')
      .then(res => res.json())
      .then(data => setTopics(data.topics));
  }, []);

  const handleClick = async (topic: string) => {
    setSelectedTopic(topic);
    setScript('');
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

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Trending YouTube Topics</h1>
      <ul className="list-disc pl-6 mb-6">
        {topics.map((topic, i) => (
          <li key={i}>
            <button
              onClick={() => handleClick(topic)}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {topic}
            </button>
          </li>
        ))}
      </ul>

      {loading && <p>Generating script for: <strong>{selectedTopic}</strong>...</p>}

      {script && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Script for: {selectedTopic}</h2>
          <pre className="whitespace-pre-wrap text-sm">{script}</pre>
        </div>
      )}
    </main>
  );
}
