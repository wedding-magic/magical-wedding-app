import React from 'react';


//landing page container component that displays instructions and renders Form component


export default function LandingPageContainer2(props){

  return (
    <div className='landingPageContainer2'>
      <h1 className='title'>
        {'Welcome to Magical Avatar'}
      </h1>

      <button onClick={props.handleSubmit}>Pay</button>

    </div>

  );

}