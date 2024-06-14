// app/page.js
'use client';
import { useEffect, useState } from 'react';
import Script from './Script'

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [scripts, setScripts] = useState([]);

  const [ScriptID, setScriptID] = useState('');


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/runorder');
        const data = await res.json();
        console.log(data)
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/show_runorder?param1=${selectedUser}`);
        const data = await res.json();
        console.log(data.users[0])
        setScripts(data.users[0]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, [selectedUser]);


  const handleSelectionChange = (e) => {
    setSelectedUser(e.target.value);
  };



  return (<div>
    <div>
      <h1>Select a Run Order</h1>
      <select value={selectedUser} onChange={handleSelectionChange}>
        <option value="" disabled>Select a Run Order</option>
        {users.map((user, i) => (
          <option key={i} value={user.id}>{user.title}</option>
        ))}
      </select>
      {selectedUser && <p>Selected Run Order: {selectedUser}</p>}
    </div>
    <div style={{display:'flex'}}>
    <div style={{minWidth:300}}>
      {scripts.map((val, i) => {
        return (
          <div key={i}>
           {i} <label onClick={()=>setScriptID(val.ScriptID)} style={{cursor:'pointer' }}>{val.SlugName} </label> <br />
          </div>
        )
      })}
    </div>
    <div style={{margin:20}}>
      <Script ScriptID={ScriptID}/>
    </div>
    </div>
   

  </div>);

}

