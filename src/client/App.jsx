import { useState, useEffect } from "react";
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';
import React from 'react';
import './style.css';
import Uploader from './components/Uploader';
import HideStatusBar from "./components/HideStatusBar";
import LandingPageContainer from './components/LandingPageContainer';

import { Routes, Route, useSearchParams} from "react-router-dom";

import { Navigate } from "react-router-dom";
import StatusBar from "@uppy/status-bar";
import ShowStatusBar from "./components/ShowStatusBar";





export default function App() {

  
    const [searchParams, setSearchParams] = useSearchParams();
    const [emailInput, setEmailInput] = useState("");
    const [genderInput, setGenderInput] = useState("");
    const [promoCodeInput, setPromoCodeInput] = useState("");

    const [url, setUrl] = useState("");
    const [transloaditParams, setTransloaditParams] = useState(
         {
                auth: { key: ''},
                template_id: '',
            });
    const [toggle, setToggle] = useState(false);
   

    const handleEmailChange =  (e) => {setEmailInput(e.target.value)};
    const handleGenderChange =  (e) => {setGenderInput(e.target.value)};
   
    const handlePromoCodeChange = (e) => {setPromoCodeInput(e.target.value)};


    function handleToggle(){
        setToggle(!toggle);
    }

    useEffect(() => {
        handleToggle()
    }, [transloaditParams]);

    async function onSubmit(event) {
        event.preventDefault();
        // console.log("reached onSubmit")
        try {
          const response = await fetch("/api/promo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: emailInput, gender: genderInput, promo_code: promoCodeInput }),
          });
    
          const data = await response.json();
        //   console.log("data returned", data);
        //   console.log("url",data.url);
          setUrl(data.url);
          setTransloaditParams({auth: {key: data.auth_key}, template_id: data.template_id});
          handleToggle();
      
          if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
          }
        } catch(error) {
          console.error(error);
          alert(error.message);
        }
      }


    // const onUploadSuccess = (elForUploadedFiles) => (file, response) => {

    //     console.log("testo")
    //     const url = response.uploadURL
    //     const fileName = file.name;
    //     console.log("file.meta",file.meta);
    //     console.log("file",file);
      
    //     const li = document.createElement('li')
    //     const a = document.createElement('a')
    //     a.href = url
    //     a.target = '_blank'
    //     a.appendChild(document.createTextNode(fileName))
    //     li.appendChild(a)
      
    //     document.querySelector(elForUploadedFiles).appendChild(li)
    //   }

    const onUploadComplete = () => {

        

        const jobId = searchParams.get('job_id');
        // console.log("upload complete jobId",jobId)
        fetch("/api/startJob", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({job_id: jobId})
        })
        .then(
            () => {console.log("success")}
        )
        .catch(err => {console.error(err);
        })


    }

    const renameFiles2 = (files) => {
    
        const updatedFiles = {};
        const jobId = searchParams.get('job_id');
        // console.log("rename files jobId",jobId);
                
        for (let i = 0; i < Object.keys(files).length; i++) {
            updatedFiles[Object.keys(files)[i]] = {
             ...files[Object.keys(files)[i]], name: `job-${jobId}_${i}` }
            };
            
        return updatedFiles;
                
            };

    const uppyThree = new Uppy({ debug: true, autoProceed: true, allowMultipleUploadBatches: false, onBeforeUpload: renameFiles2,
    restrictions: {
        maxTotalFileSize: 200000000,
        allowedFileTypes: ['image/*','.jpg','.jpeg','.png']
    }})
    .use(Transloadit, {
        assemblyOptions: {
            params: transloaditParams
        }
    })
    .use(StatusBar, {target: '.for-StatusBar', showProgressDetails: true, locale: {strings: {complete: `Upload complete!
     You will receive an email with your AI avatars within a couple hours.`}}})
    .on('complete', () => {onUploadComplete()});


   
    return (
        <>
        
            <center>
          
                <Routes>
                <Route path="/" element={<HideStatusBar><LandingPageContainer onSubmit={onSubmit}
                                                                handleEmailChange={handleEmailChange}
                                                                handleGenderChange={handleGenderChange}
                                                                handlePromoCodeChange={handlePromoCodeChange} />
                                                                </HideStatusBar>} />
             
                <Route path="/main" element=  {transloaditParams ? <ShowStatusBar><Uploader uppy={uppyThree}/></ShowStatusBar> : null} />
                </Routes>

                { (url && transloaditParams && toggle) ? <Navigate to={url} /> : null }
               
            </center>
        </>
    );
};
  
