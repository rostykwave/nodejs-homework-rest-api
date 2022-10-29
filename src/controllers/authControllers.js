const {
  register,
  login,
  comparePasswords,
  findByEmail,
  logout,
  updateAvatar,
} = require('../services/authService');
const { RequestError } = require('../helpers');
const gravatar = require('gravatar');
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
    avatarURL: gravatar.url(email),
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

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatarController = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split('.').pop();
  const filename = `${id}.${extention}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  Jimp.read(resultUpload)
    .then(image => {
      return image
        .resize(256, 256) // resize
        .write(`./public/avatars/256/${filename}`); // save
    })
    .catch(err => {
      console.error(err);
    });

  const avatarURL = path.join('avatars', filename);

  await updateAvatar(id, avatarURL);

  res.json({
    avatarURL,
  });
};

module.exports = {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateAvatarController,
};
