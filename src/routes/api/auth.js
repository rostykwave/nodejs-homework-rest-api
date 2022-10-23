const express = require('express');
const router = express.Router();
const {
  registerController,
  loginController,
} = require('../../controllers/authControllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
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

module.exports = router;
