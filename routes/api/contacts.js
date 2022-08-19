const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const {
  addContactssValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res
        .status(400)
        .json({ message: `There is no contact with id ${contactId}` });
    }
    res.json({ contact, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", addContactssValidation, async (req, res, next) => {
  const body = req.body;

  try {
    await addContact(body);
    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    await removeContact(contactId);
    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:contactId", addContactssValidation, async (req, res, next) => {
  // res.json({ message: "template message" });
  const { contactId } = req.params;
  const body = req.body;

  try {
    const contact = await updateContact(contactId, body);

    if (!contact) {
      return res
        .status(400)
        .json({ message: `There is no contact with id ${contactId}` });
    }
    res.json({ contact, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
