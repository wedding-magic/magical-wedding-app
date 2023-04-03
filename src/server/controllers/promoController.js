const promoController = {};
require('dotenv').config();


promoController.checkPromo = (req, res, next) => {
    const {promo_code} = req.body;
    console.log("promo_code",promo_code);
    console.log("env",process.env.PROMO_CODE);
    if (promo_code === process.env.PROMO_CODE) {
        return next();
    }
    else {
        console.log("denied");

        res.error = new Error("invalid promo code");
        

       return res.status(400).json(new Error("invalid promo code"));

    }
};

module.exports = promoController;