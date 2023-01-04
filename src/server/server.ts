import { PollingWatchKind } from "typescript";

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const tusHooksController = require('./controllers/tusHooksController.js');
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();
// const bucketName = 'test_input_bucket29';

const app = express();
const stripe = require('stripe')('sk_test_51MJiFPFGv5L3ZxuOCjWw4P0RSr1gb5ZKjAZgVNu1Qq4jWot1fTpNh3tYtyoJlmp56j2EMwKRCCF6vgiu3o5KAo4h00KDGdXHck');
const port = 3000;


const directoryPath = path.join(__dirname, '/../../public/data');
const linkArray: any[] = [];
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err: any, files: any) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file: any) {
        // Do whatever you want to do with the file
        // console.log(file);
        linkArray.push(file); 
    });
});





const filePath = path.join(__dirname,'/../../public/pic.png');



const params = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'image/png', 'Content-Disposition': 'attachment', 'filename': 'picture.png'};


//for testing file download component
// app.use('/static',express.static('/../../public/data'));
// app.use(cors());

app.post('/api/upload', jsonParser, tusHooksController.renameFile, async (req: any, res: any) => {
  console.log("reached upload route");
  // console.log("headers",req.headers);
  // console.log("body",req.body);
  // console.log("Hook-Name",req['Hook-Name']);
  // console.log("req",req);
  return res.sendStatus(200);
})

app.post('/api/create-checkout-session', async (req: any, res: any) => {
    console.log("reached here");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: '100 images',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:8080/main',
      cancel_url: 'http://localhost:4242/cancel',
    });
  
    res.redirect(303, session.url);
    // res.status(200).json(session.url);
  });



app.get('/images', (req: any, res: any) => {res.set(params);
    res.json(linkArray)});

app.get("/", (req: any, res: any) => {
    res.set(params);
    res.status(200).sendFile(filePath);
});

// app.get('/images', (req: any, res: any) => res.json(linkArray));

// app.use(express.static('public/data'));


app.listen(port, () => {
    console.log(`your server has been started at http://localhost:${port}`);
});