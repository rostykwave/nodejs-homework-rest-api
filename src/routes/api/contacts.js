const express = require('express');
const router = express.Router();
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require('../../controllers/contactsControllers');
const { asyncWrapper } = require('../../helpers/asyncWrapper');

const Validator = require('../../middlewares/Validator');

router.get('/', asyncWrapper(listContactsController));

router.get('/:contactId', asyncWrapper(getContactByIdController));

router.post('/', Validator('contact'), asyncWrapper(addContactController));

router.put(
  '/:contactId',
  Validator('contact'),
  asyncWrapper(updateContactController)
);

router.delete('/:contactId', asyncWrapper(removeContactController));

module.exports = router;
