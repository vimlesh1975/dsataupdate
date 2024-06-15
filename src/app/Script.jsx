// app/page.js
'use client';
import { useEffect, useState } from 'react';

export default function Home({ScriptID, title}) {
  const [content, setContent] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/getContent?ScriptID=${ScriptID}`);
        const data = await res.json();
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }

    fetchData();
  }, [ScriptID]);

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
          body: JSON.stringify({ content: newContent ,ScriptID}),
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
      <div>
     {title}
     </div>
     <div>
     <textarea
        value={content}
        onChange={handleContentChange}
        rows="30"
        cols="110"
        style={{fontSize:20}}
      />
     </div>
     
    </div>
  );
}
