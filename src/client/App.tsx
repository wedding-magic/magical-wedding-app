import { useState } from "react";
import React from 'react';
import './style.css'


//download image from test server
export default function App() {

    // const url = 'http://localhost:8000/2571405708926370fb1f69e0a527e416';
    const url = 'http://localhost:3000';
    const name = 'test.png';



    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch(url).then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = name;
                document.body.appendChild(alink);
                alink.click();
                document.body.removeChild(alink);
            })
        })
    }
    return (
        <>
            <center>
                
                <h3>Click on below button to download file</h3>
                <button onClick={onButtonClick}>
                    Download file
                </button>
            </center>
        </>
    );
};
  
