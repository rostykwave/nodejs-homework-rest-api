const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/[a-z0-9 ]/i)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\+?3?8?(0[5-9][0-9]\d{7})$/)
    .required(),
});

module.exports = addSchema;
