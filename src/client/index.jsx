import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";

// import Uppy from '@uppy/core'
// import DragDrop from '@uppy/drag-drop'
// import ProgressBar from '@uppy/progress-bar'
// import Tus from '@uppy/tus'
// import '@uppy/core/dist/style.css'
// import '@uppy/drag-drop/dist/style.css'

// Function for displaying uploaded files
// const onUploadSuccess = (elForUploadedFiles: any) => (file: any, response: any) => {
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

// const uppyOne = new Uppy({ debug: true, autoProceed: true })
// uppyOne
//   .use(DragDrop, { target: '.example-one .for-DragDrop',width: '50%' })
//   .use(Tus, { endpoint: 'http://localhost:1080/files/' })
//   .use(ProgressBar, { target: '.example-one .for-ProgressBar', hideAfterFinish: false })
//   .on('upload-success', onUploadSuccess('.example-one .uploaded-files ol'))

// const uppyTwo = new Uppy({ debug: true, autoProceed: false })
// uppyTwo
//   .use(DragDrop, { target: '.example-two .for-DragDrop',width: '50%' },)
//   .use(Tus, { endpoint: 'http://localhost:1080/files/' })
//   .use(ProgressBar, { target: '.example-two .for-ProgressBar', hideAfterFinish: false })
//   .on('upload-success', onUploadSuccess('.example-two .uploaded-files ol'))

// const uploadBtn = document.querySelector('.example-two button.upload-button')
// uploadBtn.addEventListener('click', () => {
//   uppyTwo.upload()
// })

// console.log("reached index.js");

// import Uppy from '@uppy/core'
// import FileInput from '@uppy/file-input'
// import StatusBar from '@uppy/status-bar'
// import Tus from '@uppy/tus'

//upload files to tusd server running on localhost:1080, the files are saved to public/data
// const uppyOne = new Uppy({ debug: true, autoProceed: true })
// uppyOne
//   .use(FileInput, { target: '.UppyInput', pretty: false })
//   .use(Tus, { endpoint: 'http://localhost:1080/files/' })
//   .use(StatusBar, {
//     target: '.UppyInput-Progress',
//     hideUploadButton: true,
//     hideAfterFinish: false,
//   });

// ReactDOM.render(
//     <h1>Hello World</h1>,
//   document.getElementById('root')
// );
render(
  <BrowserRouter>
  <App />
   </BrowserRouter>
  , document.getElementById('root')
);