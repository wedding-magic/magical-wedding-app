// import Uppy from '@uppy/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Tus from '@uppy/tus';
import { DragDrop } from '@uppy/react';

export default function Uploader (props) {

  // const onUploadSuccess = (elForUploadedFiles: any) => (file: any, response: any) => {

  //   console.log("testo")
  //   const url = response.uploadURL
  //   const fileName = file.name
  
  //   const li = document.createElement('li')
  //   const a = document.createElement('a')
  //   a.href = url
  //   a.target = '_blank'
  //   a.appendChild(document.createTextNode(fileName))
  //   li.appendChild(a)
  
  //   document.querySelector(elForUploadedFiles).appendChild(li)
  // }

  // const uppy = new Uppy({ debug: true, autoProceed: true})
  //     .use(Tus, { endpoint: 'http://localhost:1080/files/'  })
  //     .on('upload-success', onUploadSuccess('.example-one .uploaded-files ol'))
  

  // const uppy = useUppy(() => {
  //   return new Uppy()
  //     .use(Tus, { endpoint: 'http://localhost:1080/files/'  })
  //     .on('upload-success', onUploadSuccess('.example-one .uploaded-files ol'))
  // });

  return (

   <>
    <h5>Upload your pictures here</h5>
    <div className="StatusBar"></div>
    <DragDrop uppy={props.uppy}
    locale={{
      strings: {
        dropHereOr: 'Drop images folder here'
      }
    }}
    note='Image files only (.jpg .jpeg or .png), recommended 20+ pictures with varied backgrounds and clear view of face. Max total file size: 200 MB' 
    target='.example-one .for-DragDrop' 
    width='50%'/>
    
    
    </>
      
  
  
  
  
  
  
  
  );
}