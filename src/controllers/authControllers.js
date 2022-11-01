const {
  register,
  verify,
  login,
  comparePasswords,
  findByEmail,
  findByVerificationToken,
  logout,
  updateAvatar,
} = require('../services/authService');
const { RequestError } = require('../helpers');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

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

const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await findByVerificationToken(verificationToken);
  if (!user) {
    throw RequestError(404, 'User not found');
  }
  await verify(user._id);

  res.json({
    message: 'Verification successful',
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findByEmail(email);
  if (!user) {
    throw RequestError(401, 'Email or password wrong');
  }

  if (!user.verify) {
    throw RequestError(401, 'Email is not verified. Check your mailbox first');
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

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatarController = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split('.').pop();
  const filename = `${id}.${extention}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  Jimp.read(resultUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).write(`./public/avatars/${filename}`);
  });

  const avatarURL = path.join('avatars', filename);

  await updateAvatar(id, avatarURL);

  res.json({
    avatarURL,
  });
};

module.exports = {
  registerController,
  verifyController,
  loginController,
  getCurrentController,
  logoutController,
  updateAvatarController,
};
