import { useState, useEffect } from "react";
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import Transloadit from '@uppy/transloadit';
import React from 'react';
import './style.css';
import Uploader from './components/Uploader';
import UploadProgressBar from './components/UploadProgressBar';
import DownloadButton from './components/DownloadButton';
import LandingPageContainer from './components/LandingPageContainer';
import Test from './components/test';
import { Routes, Route, useSearchParams} from "react-router-dom";



//download image from test server
export default function App() {

    // const url = 'http://localhost:8000/2571405708926370fb1f69e0a527e416';
    // const serverUrl: string = 'http://localhost:3000/static/';
    // const imagesUrl = 'http://localhost:3000/images';
    // const name = 'test.png';
    // const [uppyTwo, setUppyTwo] = useState();

   
    const [searchParams, setSearchParams] = useSearchParams();

    // const [authKey, setAuthKey] = useState("");
    // const [templateId, setTemplateId] = useState("");

//     const fetchKeys = () => {fetch("/api/transloaditKeys", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
       
//     })
//     .then(
//         data => data.json()
//     )
//     .then(data => {
        
//         setAuthKey(data.auth_key);
//         setTemplateId(data.template_id);
//         console.log("setKeys")
        
        
//     })
//     .catch(err => {console.error(err);
//     })
// };

    // let UppyTwo;


    // useEffect(() => {

    //     fetchKeys();
    //     // console.log("uppyTwo", uppyTwo)
    //     // UppyTwo = new Uppy({ debug: true, autoProceed: true, allowMultipleUploadBatches: false, onBeforeUpload: renameFiles2})
    //     // .use(Transloadit, {
    //     //     assemblyOptions: {
    //     //         params: {
    //     //             auth: { key: authKey},
    //     //             template_id: templateId,
    //     //         }
    //     //     }
    //     // })
    //     // .on('upload-success', onUploadSuccess('.example-one .uploaded-files ol'))
    //     // .on('complete', () => {onUploadComplete()});

    // }, []);










  

    const onUploadSuccess = (elForUploadedFiles) => (file, response) => {

        console.log("testo")
        const url = response.uploadURL
        const fileName = file.name;
        console.log("file.meta",file.meta);
        console.log("file",file);
      
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.appendChild(document.createTextNode(fileName))
        li.appendChild(a)
      
        document.querySelector(elForUploadedFiles).appendChild(li)
      }

    const onUploadComplete = () => {

        

        const jobId = searchParams.get('job_id');
        console.log("jobId",jobId)
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

    // const renameFiles = (files) => {
    //     // const updatedFiles = {};
    //     const updatedFiles = {};
    //     // const [searchParams, setSearchParams] = useSearchParams();
    //     const jobId = searchParams.get('job_id');
    //     console.log("jobId",jobId);
        
    //     for (let i = 0; i < Object.keys(files).length; i++) {
    //     //    console.log("file.meta", files[Object.keys(files)[i]].meta )
    //        updatedFiles[Object.keys(files)[i]] = {
    //         ...files[Object.keys(files)[i]], meta: {...files[Object.keys(files)[i]].meta, name: `job-${jobId}_${i}.jpg` }
    //        };
    //        console.log("file.meta", updatedFiles[Object.keys(files)[i]].meta )
    //     };
    //     return updatedFiles;
        
    //         }

    const renameFiles2 = (files) => {
                // const updatedFiles = {};
        const updatedFiles = {};
                // const [searchParams, setSearchParams] = useSearchParams();
        const jobId = searchParams.get('job_id');
        console.log("jobId",jobId);
                
        for (let i = 0; i < Object.keys(files).length; i++) {
                //    console.log("file.meta", files[Object.keys(files)[i]].meta )
            updatedFiles[Object.keys(files)[i]] = {
             ...files[Object.keys(files)[i]], name: `job-${jobId}_${i}` }
            };
            //  console.log("file.meta", updatedFiles[Object.keys(files)[i]].meta )
            
            return updatedFiles;
                
                    }

 
        
    

    // const uppyOne = new Uppy({ debug: true, autoProceed: true, onBeforeUpload: renameFiles})
    // .use(Tus, { endpoint: 'http://localhost:1080/files/'  })
    // .on('upload-success', onUploadSuccess('.example-one .uploaded-files ol'))

    const uppyTwo = new Uppy({ debug: true, autoProceed: true, allowMultipleUploadBatches: false, onBeforeUpload: renameFiles2})
    .use(Transloadit, {
        assemblyOptions: {
            params: {
                auth: { key: '38333e2f522a46dc8517da85dafc1578'},
                template_id: 'b429e3e4825e49cd8b9ead29fb410566',
            }
        }
    })
    .on('upload-success', onUploadSuccess('.example-one .uploaded-files ol'))
    .on('complete', () => {onUploadComplete()});


   
    return (
        <>
            <center>
          
                <Routes>
                <Route path="/" element={<LandingPageContainer/>} />
                <Route path="/test" element ={<Test />} />
                <Route path="/main" element= {<Uploader uppy={uppyTwo}/>} />
                </Routes>
               
                
              
               
            </center>
        </>
    );
};
  
