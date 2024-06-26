


/**
 entry point for application.  Hangs React app off of #contents in index.html
 *
 * ************************************
 */







import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './style.css';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);