// app/page.js
'use client';
import { useEffect, useState } from 'react';
import Script from './Script'

export default function Home() {
  const [runOrderTitles, setRunOrderTitles] = useState([]);
  const [selectedRunOrderTitle, setSelectedRunOrderTitle] = useState('');
  const [slugs, setSlugs] = useState([]);
  const [ScriptID, setScriptID] = useState('');
  const [currentSlug, setCurrentSlug] = useState(-1);
  const [currentSlugSlugName, setCurrentSlugSlugName] = useState('');


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
    setCurrentSlugSlugName('');
    setCurrentSlug(-1);
    setScriptID('');
  };



  return (<div>
    <div style={{ display: 'flex' }}>
      <div style={{ maxHeight: 800, border: '1px solid red', overflow:'auto' }}>
        <div >
          Run Orders:<select value={selectedRunOrderTitle} onChange={handleSelectionChange}>
            <option value="" disabled>Select a Run Order</option>
            {runOrderTitles && runOrderTitles.map((runOrderTitle, i) => (
              <option key={i} value={runOrderTitle.title}>{runOrderTitle.title}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ minWidth: 300 }}>
            {slugs?.map((val, i) => {
              return (
                <div onClick={() => {
                  setScriptID(val.ScriptID);
                  setCurrentSlug(i);
                  setCurrentSlugSlugName(val.SlugName)
                }} key={i} style={{ backgroundColor: currentSlug === i ? 'green' : '#E7DBD8', margin: 10 }}>
                  {i} <label  style={{ cursor: 'pointer' }}>{val.SlugName} </label> <br />
                </div>
              )
            })}
          </div>

        </div>
      </div>
      <div style={{ margin: 10 }}>
        <Script ScriptID={ScriptID} title={selectedRunOrderTitle + ' ' + currentSlugSlugName} />
      </div>
    </div>
  </div>);

}

