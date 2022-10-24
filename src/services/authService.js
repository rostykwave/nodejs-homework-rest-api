const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { SECRET_KEY } = process.env;

const register = async ({ password, email, subscription }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    password: hashPassword,
    email,
    subscription,
  });
  return result;
};

const login = async id => {
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  await User.findByIdAndUpdate(id, { token });

  return token;
};

const comparePasswords = async (requestPassword, databasePassword) => {
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

const logout = async id => {
  return await User.findByIdAndUpdate(id, { token: '' });
};

module.exports = {
  register,
  login,
  comparePasswords,
  findByEmail,
  logout,
};
