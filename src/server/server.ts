import { PollingWatchKind } from "typescript";

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
const port = 3000;

app.get('/api/transloaditKeys', (req: any, res: any) => {

  const template_id = process.env.TRANSLOADIT_TEMPLATE_ID;
  const auth_key = process.env.AUTH_KEY;

  const response = {
    template_id: template_id,
    auth_key: auth_key
  }

  res.status(200).json(response);

})

app.post('/api/promo',promoController.checkPromo, jobsController.addJob, async (req: any, res: any) => {
  console.log("reached here");
  console.log("req.body",req.body);
  console.log("res.locals.newJob",res.locals.newJob.rows[0]);
  const paramsObject = {
    job_id: res.locals.newJob.rows[0]._id
  };
  const myQueryString = querystring.stringify(paramsObject);
  const url = `/main?${myQueryString}`;
  console.log("url",url);

  const template_id = process.env.TRANSLOADIT_TEMPLATE_ID;
  const auth_key = process.env.TRANSLOADIT_AUTH;

  return res.status(200).json({url: url, template_id: template_id, auth_key: auth_key});
})

app.post('/api/startJob', jobsController.startBatch2, async (req: any, res: any) => {
  console.log("batch Response",res.locals.batchResponse);
  res.sendStatus(200);
})



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



// app.get("/", (req: any, res: any) => {
//   res.status(200).json('hello world');
// })


app.listen(port, () => {
    console.log(`your server has been started at http://localhost:${port}`);
});