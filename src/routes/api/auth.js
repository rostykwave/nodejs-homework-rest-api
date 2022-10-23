const express = require('express');
const router = express.Router();
const {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
} = require('../../controllers/authControllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
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

module.exports = router;
