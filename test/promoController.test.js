const promoController = require('../src/server/controllers/promoController.js');

describe('promoController.checkPromo', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    process.env.PROMO_CODE = 'TEST123';
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call next middleware when promo code is correct', () => {
    req.body.promo_code = 'TEST123';
    promoController.checkPromo(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('should return error message when promo code is incorrect', () => {
    req.body.promo_code = 'INVALID';
    promoController.checkPromo(req, res, next);
    expect(next).toHaveBeenCalledWith({log: 'promoController.checkPromo invalid promo code: ERROR: invalid promo code',
                                        message: { err: `Error occurred in promoController.checkPromo. Check server logs for more details.` }});
  });
});