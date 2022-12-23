import { useState } from "react";
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import React from 'react';
import './style.css';
import Uploader from './components/Uploader';
import UploadProgressBar from './components/UploadProgressBar';
import DownloadButton from './components/DownloadButton';
import LandingPageContainer from './components/LandingPageContainer';
import { Routes, Route} from "react-router-dom";


//download image from test server
export default function App() {

    // const url = 'http://localhost:8000/2571405708926370fb1f69e0a527e416';
    // const serverUrl: string = 'http://localhost:3000/static/';
    const imagesUrl = 'http://localhost:3000/images';
    const name = 'test.png';




  

    const onUploadSuccess = (elForUploadedFiles) => (file, response) => {

        console.log("testo")
        const url = response.uploadURL
        const fileName = file.name
      
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.appendChild(document.createTextNode(fileName))
        li.appendChild(a)
      
        document.querySelector(elForUploadedFiles).appendChild(li)
      }

    const uppyOne = new Uppy({ debug: true, autoProceed: true})
    .use(Tus, { endpoint: 'http://localhost:1080/files/'  })
    .on('upload-success', onUploadSuccess('.example-one .uploaded-files ol'))


   
    return (
        <>
            <center>
                <Routes>
                <Route path="/" element={<LandingPageContainer/>} />
                <Route path="main" element={<><Uploader uppy={uppyOne}/><UploadProgressBar uppy={uppyOne}/><DownloadButton /></>} />
                {/* <DownloadButton /> */}
                </Routes>
                
              
               
            </center>
        </>
    );
};
  
