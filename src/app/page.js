// pages/index.js
'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/users');
      const data = await res.json();
      console.log(data.dd[0])
      setUsers(data.dd[0]);
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
