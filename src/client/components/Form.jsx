import React from "react";
import { RadioGroup, RadioButton, ReversedRadioButton } from "react-radio-buttons";

//form component for landing page. currently takes user email, gender, and promo code as inputs
//and submits to checkPromo route on server, which if successful triggers redirect to Uploader component


export default function Form(props) {


    return (

       <>


        <form onSubmit={props.onSubmit} className="landingPageForm">
          <div className="landingPageForm">
        <label htmlFor="email">{"email: "} </label>
       <input type="text"
              name="email"
              placeholder=""
              // value={emailInput}
              onChange={props.handleEmailChange}

        />
        </div>

        <div className="landingPageForm">
            {/* <label id="radioButtonsLabel">{"gender: "}</label> */}
            <div className="radioButtonsContainer">
            <label id="radioButtonsLabel">{"gender: "}</label>
            <div className="radioButtons">
        <RadioGroup onChange={ props.handleGenderChange } horizontal >
          <ReversedRadioButton value="m" pointColor="#87B9E1">
            Male
          </ReversedRadioButton>
          <ReversedRadioButton value="f" pointColor="#87B9E1">
            Female
          </ReversedRadioButton>
          <ReversedRadioButton value="b" pointColor="#87B9E1">
            Both
          </ReversedRadioButton>
          </RadioGroup>
          </div>
          </div>
        {/* <label htmlFor="gender">{"gender: "} </label>
       <input type="text"
              name="gender"
              placeholder="enter 'M', 'F', or 'B'"
              // value={emailInput}
              onChange={props.handleGenderChange}

        /> */}
        </div>
       
   
        <div className="landingPageForm">
        <label htmlFor="promo_code">{"promo code: "} </label>
        <input type="text"
              name="promo_code"
              placeholder=""
              // value={promoCodeInput}
              onChange={props.handlePromoCodeChange}

        />
        </div>
        
        
        <button type="submit" value="Submit">Submit</button>
        </form>  

</>

    )



}