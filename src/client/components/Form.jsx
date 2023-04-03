import React from "react";


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