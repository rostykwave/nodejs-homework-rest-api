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
