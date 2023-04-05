import React from 'react';
import Form from './Form.jsx';

//landing page container component that displays instructions and renders Form component


export default function LandingPageContainer(props){

 

  return (
   <div className='landingPageContainer'>
    <h1 className='title'>
        {'Welcome to Magical Avatar'}
    </h1>
    <h2>
      {'(Demo Version)'}
    </h2>
    <p className='instructions'>
     {` Instructions: If you are lucky enough to have a promo code, enter it along with your email. For gender,
     enter 'M' to receive images for male and neutral prompts, 'F' for female and neutral, 'B' for all prompts. 
     You will be redirected to a page where you can drag and drop a folder of images of yourself 
     or whichever subject you want to create avatars for. In approximately 1 hour (occasionally up to several)
     you will receive an email with a sampler of avatars in different styles.`}
    </p>
    <Form onSubmit={props.onSubmit}
                     handleEmailChange={props.handleEmailChange}
                     handleGenderChange={props.handleGenderChange}
                    
                     handlePromoCodeChange={props.handlePromoCodeChange}/>
     </div>

  )

}