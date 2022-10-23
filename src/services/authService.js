const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const register = async ({ password, email, subscription }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    password: hashPassword,
    email,
    subscription,
  });
  return result;
};

const login = async payload => {
  const { SECRET_KEY } = process.env;

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  return token;
};

const comparePasswors = async (requestPassword, databasePassword) => {
  const passwordCompare = await bcrypt.compare(
    requestPassword,
    databasePassword
  );
  return passwordCompare;
};

const findByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  register,
  login,
  comparePasswors,
  findByEmail,
};
