const express = require('express');
const router = express.Router();
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require('../../controllers/contactsControllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const contactSchemas = require('../../schemas/contact');


router.get('/', ctrlWrapper(listContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(contactSchemas.addSchema),
  ctrlWrapper(addContactController)
);

router.put(
  '/:contactId',
  validateBody(contactSchemas.addSchema),
  ctrlWrapper(updateContactController)
);

router.delete('/:contactId', ctrlWrapper(removeContactController));

module.exports = router;
