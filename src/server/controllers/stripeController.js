// const stripe = require('stripe')('sk_test_51MJiFPFGv5L3ZxuOCjWw4P0RSr1gb5ZKjAZgVNu1Qq4jWot1fTpNh3tYtyoJlmp56j2EMwKRCCF6vgiu3o5KAo4h00KDGdXHck');


//******* controller for stripe authentication. if the payment is successful it will redirect to uploader page */

// const stripeController = {};

// stripeController.makePayment = async (req, res, next) => {
//     console.log("reached here");
//     console.log("req.body",req.body);
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
//       success_url: 'http://localhost:8080/main',
//       cancel_url: 'http://localhost:4242/cancel',
//     });
  
//     res.redirect(303, session.url);
//     // res.status(200).json(session.url);
//   };