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
      return res.status(404).json({ message: `Not found` });
    }
    res.json({ contact, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", addContactssValidation, async (req, res, next) => {
  const body = req.body;

  try {
    const addedContact = await addContact(body);
    res.status(201).json({ ...addedContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await removeContact(contactId);
    if (!contact) {
      return res.status(404).json({ message: `Not found` });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:contactId", addContactssValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const contact = await updateContact(contactId, body);

    if (!contact) {
      return res.status(404).json({ message: `Not found` });
    }
    res.json({ contact, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
