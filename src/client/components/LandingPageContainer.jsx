import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPageContainer(){

  return (
   <>
    <h1>
        Welcome to Magical Wedding, Pay Us
    </h1>
    
    <Link to="main"> <button>REDIRECT TO MAIN (TESTING REACT ROUTER)</button></Link>
     </>

  )

}