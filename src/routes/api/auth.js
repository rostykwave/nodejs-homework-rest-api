const express = require('express');
const router = express.Router();
const {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateAvatarController,
} = require('../../controllers/authControllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrlWrapper(registerController)
);

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(loginController)
);

router.get('/current', authenticate, ctrlWrapper(getCurrentController));

router.get('/logout', authenticate, ctrlWrapper(logoutController));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(updateAvatarController)
);

module.exports = router;
