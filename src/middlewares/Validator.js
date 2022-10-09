const createHttpError = require('http-errors');

//* Include all validators
const Validators = require('../validators');

module.exports = function (validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) {
        res.status(400).json({
          message: err.message,
        });
        return;
      }
      next(createHttpError(500));
    }
  };
};
