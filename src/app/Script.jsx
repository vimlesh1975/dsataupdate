// app/page.js
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/getContent');
        const data = await res.json();
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }

    fetchData();
  }, []);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      try {
        const res = await fetch('/api/updateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: newContent }),
        });
        const data = await res.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error saving content:', error);
      }
    }, 500); // Adjust the delay as needed

    setTimeoutId(newTimeoutId);
  };

  return (
    <div>
      <h1>Edit Content</h1>
      <textarea
        value={content}
        onChange={handleContentChange}
        rows="10"
        cols="50"
      />
    </div>
  );
}