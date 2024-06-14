// app/page.js
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.UserName}</li>
        ))}
      </ul>
    </div>
  );
}

