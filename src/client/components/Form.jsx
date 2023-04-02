import { useState, useEffect } from "react";
import React from "react";
import {Navigate} from "react-router-dom";

export default function Form(props) {

    // const [emailInput, setEmailInput] = useState("");
    // const [promptInput, setPromptInput] = useState("");
    // const [numImagesInput, setNumImagesInput] = useState("");
    // const [promoCodeInput, setPromoCodeInput] = useState("");

    // const [url, setUrl] = useState("");

    // async function onSubmit(event) {
    //     event.preventDefault();
    //     try {
    //       const response = await fetch("/api/promo", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ email: emailInput, prompt_id: promptInput, count_images: numImagesInput, promo_code: promoCodeInput }),
    //       });
    
    //       const data = await response.json();
    //       if (response.status !== 200) {
    //         throw data.error || new Error(`Request failed with status ${response.status}`);
    //       }

    //       setUrl(data.url);
    //       // console.log("url",data.url);
    
    //     //   setResult(data.result);
    //     //   console.log(data.result);
          
    //       // setAnimalInput("");
    //     } catch(error) {
    //       // Consider implementing your own error handling logic here
    //       console.error(error);
    //       alert(error.message);
    //     }
    //   }

    return (

       <>

       {/* {
        url ? <Navigate to={url} /> : null
       } */}

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
       
        {/* <div className="LandingPageForm">
        <label htmlFor="prompt_id">{"prompt_id: "} </label>
         <input type="text"
              name="prompt_id"
              placeholder=""
              // value={promptInput}
              onChange={props.handlePromptChange}

        />
        </div>
       
        <div className="LandingPageForm">
        <label htmlFor="count_images">{"number of images: "} </label>
         <input type="text"
              name="count_images"
              placeholder=""
              // value={numImagesInput}
              onChange={props.handleNumImagesChange}

        />
        </div> */}
   
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