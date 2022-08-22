const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("../services/contactsService");
// const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// } = require("../models/contacts");
// const { MissingFieldsError } = require("../helpers/errors");

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
  res.status(201).json({ addedContact, message: "success" });
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  console.log("body", body);
  // if (!body) {
  //   // return res.status(400).json({ message: "missing fields" });
  //   throw new MissingFieldsError("missing fields");
  // }

  const contact = await updateContact(contactId, body);

  res.json({ contact, message: "update success" });
};

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  console.log("body", body);

  const contact = await updateStatusContact(contactId, body);

  res.json({ contact, message: "update success" });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;

  await removeContact(contactId);

  res.json({ message: "contact deleted" });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusContactController,
  removeContactController,
};
