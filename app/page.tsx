'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const generateScript = async () => {
    if (!topic.trim()) return alert('Enter a topic!');
    setLoading(true);

    try {
      const res = await fetch('/api/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      setScript(data.script);
    } catch (error) {
      console.error('Error generating script:', error);
    } finally {
      setLoading(false);
    }
  };

  const playVoice = async () => {
    if (!script) return alert('Generate a script first!');
    setPlaying(true);

    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: script }),
      });

      const audioBlob = await res.blob();
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      audio.play();
      audio.onended = () => setPlaying(false);
    } catch (error) {
      console.error('Error playing voice:', error);
      setPlaying(false);
    }
  };

  const generateVideo = async () => {
    if (!script) return alert('Generate the script and voice first!');
    setVideoLoading(true);

    try {
      const res = await fetch('/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scriptText: script,
          audioUrl: '/output.mp3', // audio file already stored in public
        }),
      });

      const data = await res.json();
      alert(`Video created: ${data.videoPath || 'Check console'}`);
    } catch (error) {
      console.error('Video generation failed:', error);
      alert('Failed to generate video.');
    } finally {
      setVideoLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎥 YouTube AI Script Generator</h1>

      <input
        className="border p-2 w-full rounded mb-4"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter video topic"
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

      {script && (
        <button
          onClick={playVoice}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          disabled={playing}
        >
          {playing ? '🔊 Playing...' : '▶️ Play Voice'}
        </button>
      )}

      {script && (
        <div className="p-8">
          <button
            onClick={generateVideo}
            className="bg-purple-600 px-4 py-2 rounded text-white"
            disabled={videoLoading}
          >
            {videoLoading ? 'Generating Video...' : '🎬 Generate Video'}
          </button>
        </div>
      )}
      {!videoLoading && (
  <video className="mt-4 w-full rounded" controls>
    <source src="/output.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
)}

    </main>
  );
}
