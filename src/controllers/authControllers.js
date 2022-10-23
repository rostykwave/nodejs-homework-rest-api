const {
  register,
  login,
  comparePasswords,
  findByEmail,
  logout,
} = require('../services/authService');
const { RequestError } = require('../helpers');

const registerController = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await findByEmail(email);

  if (user) {
    throw RequestError(409, 'Email in use');
  }

  const result = await register({
    email,
    password,
    subscription,
  });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findByEmail(email);
  if (!user) {
    throw RequestError(401, 'Email or password wrong');
  }

  const passwordCompare = await comparePasswords(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, 'Email or password is wrong');
  }

  const token = await login(user._id);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logoutController = async (req, res) => {
  const { _id: id } = req.user;
  await logout(id);

  res.status(204);
};

module.exports = {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
};
