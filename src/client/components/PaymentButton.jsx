import React from 'react';
import { redirect } from 'react-router-dom';

export default function PaymentButton(props) {


    function onButtonClick(){


        fetch("/api/create-checkout-session", {
            method: 'POST',
            headers: {'Content-Type':'/application/json', 
            'Access-Control-Allow-Origin': '*'}
         
        })
        .then(res => res.json())
        .then(
            (url) => {
                console.log(url);
                return redirect(url);
            }
        )


    };


    return (
        <button onClick={onButtonClick}>
            Pay Us
        </button>
    )



}