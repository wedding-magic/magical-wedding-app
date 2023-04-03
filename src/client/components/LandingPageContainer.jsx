import React from 'react';

import Form from './Form.jsx';


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
     {` Instructions: If you are lucky enough to have a promo code, enter it along with your email. 
     You will be redirected to a page where you can drag and drop a folder of images of yourself 
     or whichever subject you want to create avatars for. In approximately 1 hour (occasionally up to several)
     you will receive an email with a sampler of avatars in different styles.`}
    </p>
    <Form onSubmit={props.onSubmit}
                     handleEmailChange={props.handleEmailChange}
                     handleNumImagesChange={props.handleNumImagesChange}
                     handlePromoCodeChange={props.handlePromoCodeChange}
                     handlePromptChange={props.handlePromptChange}/>
     </div>

  )

}