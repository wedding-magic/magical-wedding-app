import { useState, useEffect } from 'react';
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';
import React from 'react';
import './style.css';
import Uploader from './components/Uploader';
import HideStatusBar from './components/HideStatusBar';
import LandingPageContainer from './components/LandingPageContainer';
import LandingPageContainer2 from './components/LandingPageContainer2';

import { Routes, Route, useSearchParams} from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import StatusBar from '@uppy/status-bar';
import ShowStatusBar from './components/ShowStatusBar';
//import Informer from '@uppy/informer';


export default function App() {

  //define state variables
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailInput, setEmailInput] = useState('');
  const [genderInput, setGenderInput] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');

  const [url, setUrl] = useState('');
  const [transloaditParams, setTransloaditParams] = useState(
    {
      auth: { key: ''},
      template_id: '',
    });
  const [toggle, setToggle] = useState(false);
   
  //define onChange handlers for landing page form
  const handleEmailChange =  (e) => {setEmailInput(e.target.value);};
  const handleGenderChange =  (val) => {setGenderInput(val);};
  const handlePromoCodeChange = (e) => {setPromoCodeInput(e.target.value);};

  //method to insure useNavigate component for routing to image upload page only triggers once (when toggle=true)
  function handleToggle(){
    setToggle(!toggle);
  }

  useEffect(() => {
    handleToggle();
  }, [transloaditParams]);

  //check for job_id and transloadit params and redirect to uploader page if they exist

  useEffect(() => {
    const job_id = searchParams.get('job_id');
    const template_id = searchParams.get('template_id');
    const auth_key = searchParams.get('auth_key');
    // const url = `/main?job_id=${job_id}`;
    if (job_id && template_id && auth_key) {
      setUrl(`/main?job_id=${job_id}`);
      setTransloaditParams({auth: {key: auth_key}, template_id: template_id});
      handleToggle();
    }

  });



  //when form is submitted, send data to server to check promo code, if promo code is correct return 
  //transloadit keys for uploader

  async function onSubmit(event) {
    event.preventDefault();
    // console.log("reached onSubmit")
    try {
      const response = await fetch('/api/promo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  //trigger batch api for job id when upload is complete

  const onUploadComplete = () => {

        

    const jobId = searchParams.get('job_id');
    // console.log("upload complete jobId",jobId)
    fetch('/api/startJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({job_id: jobId})
    })
      .then(
        () => {console.log('success');}
      )
      .catch(err => {console.error(err);
      });


  };

  //rename files before upload in job-{job_id}_{number} format

  const renameFiles2 = (files) => {

    if (Object.keys(files).length < 15) {
      // console.log('you have selected less than 15 files.')
      uppyThree.info('You have selected less than 15 files for upload. Please try again with at least 15 files.','error',500);
      uppyThree.cancelAll();
      uppyThree.resetProgress();
      return false;
    }
    
    const updatedFiles = {};
    const jobId = searchParams.get('job_id');
    // console.log("rename files jobId",jobId);
                
    for (let i = 0; i < Object.keys(files).length; i++) {
      updatedFiles[Object.keys(files)[i]] = {
        ...files[Object.keys(files)[i]], name: `job-${jobId}_${i}` };
    }
            
    return updatedFiles;
                
  };

  //handle upload errors

  const handleUppyError = (error) => {
    uppyThree.setState({info: [{isHidden: true, type: 'info', message: ''}]});
    // console.log("upload error",error)
    // uppyThree.info('Something went wrong! If errors persist, try returning to upload page, resubmitting form with promo code, and try again.','error',5000);
    uppyThree.cancelAll();
    uppyThree.resetProgress();
    uppyThree.info('Upload failed. If errors persist, try returning to homepage, resubmitting form with promo code, and trying again without refreshing the page.','error',10000);
  };

  //define uppy object for uploader component

  const uppyThree = new Uppy({ debug: true, autoProceed: true, allowMultipleUploadBatches: false, onBeforeUpload: renameFiles2,
    restrictions: {
      maxTotalFileSize: 200000000,
      minNumberOfFiles: 15,
      allowedFileTypes: ['image/*','.jpg','.jpeg','.png']
    }})
    .use(Transloadit, {
      assemblyOptions: {
        params: transloaditParams
      }
    })
    .use(StatusBar, {target: '.for-StatusBar', showProgressDetails: true, hideUploadButton: true, locale: {strings: {complete: `Upload complete!
     You will receive an email with your AI avatars within a couple hours.`, uploadFailed: 'Upload failed. If errors persist, try returning to homepage, resubmitting form with promo code, and trying again without refreshing the page.'}}})
    //.use(Informer, {target: '.for-Informer'})
    .on('complete', () => {onUploadComplete();})
    .on('error', () => handleUppyError());
   
  
  function dummyHandleSubmit(){

    fetch('/api/create-checkout-session', {method: 'POST',  headers: {
      'Content-Type': 'application/json'
    }}).then(
      response => response.json()
    ).then(
      response => {console.log(response);
        window.location.href = response.url;}
    ).catch(
      err => console.log(err)
    );

  }
  //define routes and conditional rendering of components. status bar for uploader is hidden on landing page and shown on uploader page.
  //Navigate component used to redirect to Uploader component after successful form submission.
   
  return (
    <>
        
      <center>

          
        <Routes>
          <Route path="/" element={
            <HideStatusBar>
              <LandingPageContainer2 handleSubmit={dummyHandleSubmit}/>
            </HideStatusBar>
          } />
             
          <Route path="/main" element={transloaditParams ? <ShowStatusBar><Uploader uppy={uppyThree}/></ShowStatusBar> : null} />
        </Routes>

        { (url && transloaditParams && toggle) ? <Navigate to={url} /> : null }
               
      </center>
    </>
  );
}
  
