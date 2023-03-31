import React from 'react';
import Form from './Form.jsx';

export default function LandingPageContainer(props){

  return (
   <>
    <h1>
        Welcome to Magical Wedding, Pay Us
    </h1>
    <Form onSubmit={props.onSubmit}
                     handleEmailChange={props.handleEmailChange}
                     handleNumImagesChange={props.handleNumImagesChange}
                     handlePromoCodeChange={props.handlePromoCodeChange}
                     handlePromptChange={props.handlePromptChange}/>
    {/* <PaymentButton />
    
    <Link to="main"> <button>REDIRECT TO MAIN (TESTING REACT ROUTER)</button></Link> */}
     </>

  )

}