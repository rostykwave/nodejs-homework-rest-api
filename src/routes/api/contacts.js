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
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', ctrlWrapper(listContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(schemas.addSchema),
  ctrlWrapper(addContactController)
);

router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  ctrlWrapper(updateContactController)
);

router.patch(
  '/:contactId/favorite',
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(updateStatusContactController)
);

router.delete('/:contactId', ctrlWrapper(removeContactController));

module.exports = router;
