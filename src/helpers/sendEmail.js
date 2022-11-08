const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, SEND_GRID_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const mail = { ...data, from: SEND_GRID_EMAIL_FROM };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
