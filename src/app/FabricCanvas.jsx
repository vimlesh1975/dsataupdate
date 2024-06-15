'use client'
// src/FabricCanvas.js
import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const FabricCanvas = ({ jsonContent }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setZoom(0.4)

    // Set canvas dimensions
    canvas.setWidth(600);
    canvas.setHeight(400);

    if (jsonContent) {
      try {
        // Try to parse JSON and load it into the canvas
        const parsedJSON = JSON.parse(jsonContent);
        canvas.loadFromJSON(parsedJSON.pageValue,  () => {
          console.log('Object loaded:');
        });
      } catch (error) {
        // Handle JSON parsing errors
        console.error('Invalid JSON content provided:', error);
        // alert('Failed to load canvas content: Invalid JSON');
      }
    }

    // Clean up on unmount
    return () => {
      canvas.dispose();
    };
  }, [jsonContent]);

  return (
    <div style={{border:'1px solid blue'}}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FabricCanvas;
