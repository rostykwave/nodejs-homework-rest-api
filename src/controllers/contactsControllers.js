const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contactsService");
// const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// } = require("../models/contacts");
const { MissingFieldsError } = require("../helpers/errors");

const listContactsController = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts, message: "success" });
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  res.json({ contact, message: "success" });
};

const addContactController = async (req, res, next) => {
  const body = req.body;

  const addedContact = await addContact(body);
  res.status(201).json({ ...addedContact });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;

  await removeContact(contactId);

  res.json({ message: "contact deleted" });
};
const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (!body) {
    // return res.status(400).json({ message: "missing fields" });
    throw new MissingFieldsError("missing fields");
  }

  const contact = await updateContact(contactId, body);

  res.json({ contact, message: "success" });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
};
