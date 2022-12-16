import React from 'react';
import { render } from 'react-dom';
import App from './App';

// console.log("reached index.js");

import Uppy from '@uppy/core'
import FileInput from '@uppy/file-input'
import StatusBar from '@uppy/status-bar'
import Tus from '@uppy/tus'

//upload files to tusd server running on localhost:1080, the files are saved to public/data
const uppyOne = new Uppy({ debug: true, autoProceed: true })
uppyOne
  .use(FileInput, { target: '.UppyInput', pretty: false })
  .use(Tus, { endpoint: 'http://localhost:1080/files/' })
  .use(StatusBar, {
    target: '.UppyInput-Progress',
    hideUploadButton: true,
    hideAfterFinish: false,
  });

// ReactDOM.render(
//     <h1>Hello World</h1>,
//   document.getElementById('root')
// );
render(
  <App />, document.getElementById('root')
);