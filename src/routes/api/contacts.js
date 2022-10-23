const express = require('express');
const router = express.Router();
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers/contactsControllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrlWrapper(listContactsController));

router.get('/:contactId', authenticate, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(addContactController)
);

router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(updateContactController)
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(updateStatusContactController)
);

router.delete(
  '/:contactId',
  authenticate,
  ctrlWrapper(removeContactController)
);

module.exports = router;
