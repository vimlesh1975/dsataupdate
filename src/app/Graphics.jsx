'use client';
import { useEffect, useState } from 'react';
import FabricCanvas from './FabricCanvas'

export default function Home({ ScriptID, title }) {
    const [graphics, setGraphics] = useState([]);
    const [currentGraphics, setCurrentGraphics] = useState(-1);
    const [graphicsID, setGraphicsID] = useState('');
    const [graphicsText1, seGraphicsText1] = useState('');


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
        <div style={{display:'flex'}}>
        <div>
        {graphics?.map((val, i) => {
            return (
                <div onClick={() => {
                    setGraphicsID(val.GraphicsID);
                    setCurrentGraphics(i)
                    seGraphicsText1(val.Graphicstext1)
                }} key={i} style={{ backgroundColor: currentGraphics === i ? 'green' : '#E7DBD8', margin: 10 }}>
                    {i} <label style={{ cursor: 'pointer' }}>{val.GraphicsTemplate} </label> <br />
                </div>
            )
        })}
        </div>
    
        <div>
       < FabricCanvas jsonContent={graphicsText1} />
        </div>
        </div>
    
    </div>)
}