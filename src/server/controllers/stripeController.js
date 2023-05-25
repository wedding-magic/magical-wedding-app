
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

const stripeController = {};

stripeController.makePayment = async (req, res, next) => {
  console.log('reached here');
  console.log('req.body',req.body);
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
    success_url: 'http://localhost:8080/api/order/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:4242/cancel',
  });

  //   res.locals.url = session.url;
  //   return next();


  
  return res.json({url: session.url});
  // res.status(200).json(session.url);
};

stripeController.getEmail = async (req, res, next) => {
  console.log('session_id', req.query.session_id);
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log('session', session);
  console.log('customer', session.customer);
  console.log('email', session.customer_details.email);
  const email = session.customer_details.email;
  res.locals.email = email;
  return next();
};
// const customer = await stripe.customers.retrieve(session.customer);
// console.log("success 3");

// res.send(`<html><body><h1>Thanks for your order, ${email}</h1></body></html>`);

module.exports = stripeController;