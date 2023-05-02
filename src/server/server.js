const express = require('express');
const querystring = require('querystring');
const jobsController = require('./controllers/jobsController');
const promoController = require('./controllers/promoController.js');
const path = require('path');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../dist/')));

// const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const PORT = process.env.PORT || 3000;


//check if promo code is correct. if it is, add job to jobs table  and return redirect url with job_id query parameter set
//along with transloadit keys for frontend uppy config

app.post('/api/promo',promoController.checkPromo, jobsController.addJob, async (req, res) => {
  // console.log('reached here');
  // console.log('req.body',req.body);
  // console.log('res.locals.newJob',res.locals.newJob.rows[0]);
  const paramsObject = {
    job_id: res.locals.newJob.rows[0]._id
  };
  const myQueryString = querystring.stringify(paramsObject);
  const url = `/main?${myQueryString}`;
  // console.log('url',url);

  const template_id = process.env.TRANSLOADIT_TEMPLATE_ID;
  const auth_key = process.env.TRANSLOADIT_AUTH;

  return res.status(200).json({url: url, template_id: template_id, auth_key: auth_key});
});

//trigger batch api for user's job id

app.post('/api/startJob', jobsController.startBatch2, async (req, res) => {
  console.log('batch Response',res.locals.batchResponse);
  res.sendStatus(200);
});



// app.post('/api/upload', jsonParser, tusHooksController.renameFile, jobsController.startBatch, async (req: any, res: any) => {
//   console.log("batch Response",res.locals.batchResponse);
//   // console.log("headers",req.headers);
//   // console.log("body",req.body);
//   // console.log("Hook-Name",req['Hook-Name']);
//   // console.log("req",req);
//   return res.sendStatus(200);
// })

// app.post('/api/create-checkout-session', jobsController.addJob, async (req: any, res: any) => {
//     console.log("reached here");
//     console.log("req.body",req.body);
//     console.log("res.locals.newJob",res.locals.newJob.rows[0]);
//     const paramsObject = {
//       job_id: res.locals.newJob.rows[0]._id
//     };
//     const myQueryString = querystring.stringify(paramsObject);
//     // res.setHeader('Access-Control-Allow-Origin','*');



//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: '100 images',
//             },
//             unit_amount: 1000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `http://localhost:8080/main?${myQueryString}`,
//       cancel_url: 'http://localhost:4242/cancel',
//     });

//     console.log("url",session.url);

    
  
//     res.redirect(303, session.url);
//     // res.status(200).json(session.url);
//   });

// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  return res.sendStatus(404);
});

// global error handler
app.use((err,req,res,next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {err: 'An error occurred'}
  };
  const errorObj = Object.assign(defaultError, err);
  console.log(errorObj.log);
  // res.status(errorObj.status);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`your server has been started port ${PORT}`);
});

module.exports = app;