// app/page.js
'use client';
import { useEffect, useState } from 'react';
import Script from './Script'

export default function Home() {
  const [runOrderTitles, setRunOrderTitles] = useState([]);
  const [selectedRunOrderTitle, setSelectedRunOrderTitle] = useState('');
  const [slugs, setSlugs] = useState([]);
  const [ScriptID, setScriptID] = useState('');


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/runorder');
        const data = await res.json();
        setRunOrderTitles(data.RunOrderTitles);
      } catch (error) {
        console.error('Error fetching RunOrderTitles:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/show_runorder?param1=${selectedRunOrderTitle}`);
        const data = await res.json();
        setSlugs(data.slugs);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, [selectedRunOrderTitle]);


  const handleSelectionChange = (e) => {
    setSelectedRunOrderTitle(e.target.value);
  };



  return (<div>
<div style={{display:'flex'}}>
    <div>
      <div>
        Run Orders:<select value={selectedRunOrderTitle} onChange={handleSelectionChange}>
          <option value="" disabled>Select a Run Order</option>
          {runOrderTitles && runOrderTitles.map((user, i) => (
            <option key={i} value={user.id}>{user.title}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ minWidth: 300 }}>
          {slugs?.map((val, i) => {
            return (
              <div key={i}>
                {i} <label onClick={() => setScriptID(val.ScriptID)} style={{ cursor: 'pointer' }}>{val.SlugName} </label> <br />
              </div>
            )
          })}
        </div>

      </div>
    </div>
    <div style={{ margin: 0 }}>
      <Script ScriptID={ScriptID} />
    </div>
    </div>
  </div>);

}

