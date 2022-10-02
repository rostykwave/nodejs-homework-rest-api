const express = require("express");
const router = express.Router();
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
} = require("../../controllers/contactsControllers");
const {
  addContactssValidation,
} = require("../../middlewares/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/", asyncWrapper(listContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", addContactssValidation, asyncWrapper(addContactController));

router.put(
  "/:contactId",
  addContactssValidation,
  asyncWrapper(updateContactController)
);

router.delete("/:contactId", asyncWrapper(removeContactController));

module.exports = router;
// const express = require('express');
// const { listContacts, getContactById } = require('../../models/contacts');

// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   const contacts = await listContacts();
//   res.json(contacts);
// })

// router.get('/:contactId', async (req, res, next) => {
//   const {contactId} = req.params;
//   const contact = await getContactById(contactId);

//   if (!contact) {
//     res.status(404);
//      res.json({"message": "Not found"});
//   }

//   res.json(contact);
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router
