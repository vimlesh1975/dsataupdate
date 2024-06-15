'use client';
import { useEffect, useState } from 'react';

export default function Home({ ScriptID, title }) {
    const [graphics, setGraphics] = useState([]);


    useEffect(() => {
        async function fetchData() {
          try {
            const res = await fetch(`/api/getGraphics?ScriptID=${ScriptID}`);
            const data = await res.json();
            setGraphics(data.graphics);
          } catch (error) {
            console.error('Error fetching RunOrderTitles:', error);
          }
        }
    
        fetchData();
      }, [ScriptID]);

    return (<div>
{graphics?.map((val, i) => {
              return (
                <div onClick={() => {
                //   setScriptID(val.ScriptID);
                //   setCurrentSlug(i);
                //   setCurrentSlugSlugName(val.GraphicsTemplate)
                }} key={i}>
                  {i} <label  style={{ cursor: 'pointer' }}>{val.GraphicsTemplate} </label> <br />
                </div>
              )
            })}
    </div>)
}