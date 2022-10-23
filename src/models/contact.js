const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require('joi');
const { handleSaveErrors } = require('../helpers');

const phoneRegexp = /^\+?3?8?(0[5-9][0-9]\d{7})$/;
const nameRegexp = /[a-z0-9 ]/i;
const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
