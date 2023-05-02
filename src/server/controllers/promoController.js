require('dotenv').config();

const promoController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `promoController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in promoController.${method}. Check server logs for more details.` }
  };
};

//middleware to check if promo code is correct


promoController.checkPromo = (req, res, next) => {
  const {promo_code} = req.body;
  // console.log('promo_code',promo_code);
  // console.log('env',process.env.PROMO_CODE);
  if (promo_code === process.env.PROMO_CODE) {
    return next();
  }
  else {

    return next(createErr({
      method: 'checkPromo',
      type: 'invalid promo code',
      err: 'invalid promo code'
    }));

  }
};

module.exports = promoController;