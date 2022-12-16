import React from 'react';
import { render } from 'react-dom';
import App from './App';

console.log("reached index.js");

// ReactDOM.render(
//     <h1>Hello World</h1>,
//   document.getElementById('root')
// );
render(
  <App />, document.getElementById('root')
);