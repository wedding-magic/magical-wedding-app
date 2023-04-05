import React from "react";

//form component for landing page. currently takes user email, gender, and promo code as inputs
//and submits to checkPromo route on server, which if successful triggers redirect to Uploader component


export default function Form(props) {


    return (

       <>


        <form onSubmit={props.onSubmit} className="landingPageForm">
          <div className="LandingPageForm">
        <label htmlFor="email">{"email: "} </label>
       <input type="text"
              name="email"
              placeholder=""
              // value={emailInput}
              onChange={props.handleEmailChange}

        />
        </div>

        <div className="LandingPageForm">
        <label htmlFor="gender">{"gender: "} </label>
       <input type="text"
              name="gender"
              placeholder="enter 'M', 'F', or 'B'"
              // value={emailInput}
              onChange={props.handleGenderChange}

        />
        </div>
       
   
        <div className="LandingPageForm">
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