const express = require("express");
const router = express.Router();
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require("../../controllers/contactsControllers");
const {
  addContactssValidation,
} = require("../../middlewares/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/", asyncWrapper(listContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", addContactssValidation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.put(
  "/:contactId",
  addContactssValidation,
  asyncWrapper(updateContactController)
);

module.exports = router;
