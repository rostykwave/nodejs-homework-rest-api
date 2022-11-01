const express = require('express');
const router = express.Router();
const {
  registerController,
  verifyController,
  resendEmailController,
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

router.get('/verify/:verificationToken', ctrlWrapper(verifyController));

router.post(
  '/verify',
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(resendEmailController)
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
