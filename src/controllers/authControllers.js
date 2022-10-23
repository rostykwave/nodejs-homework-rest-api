const {
  register,
  login,
  comparePasswors,
  findByEmail,
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
    email: result.email,
    subscription: result.subscription,
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findByEmail(email);
  if (!user) {
    throw RequestError(401, 'Email or password wrong');
  }

  const passwordCompare = await comparePasswors(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, 'Email or password wrong');
  }

  const payload = {
    id: user._id,
  };
  const token = await login(payload);

  res.json({
    token,
  });
};

module.exports = {
  registerController,
  loginController,
};
