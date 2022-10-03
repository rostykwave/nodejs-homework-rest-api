
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../services/contactsService");

const listContactsController = async (req, res, next) => {
  const contacts = await listContacts();

  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  res.json(contact);
};

const addContactController = async (req, res, next) => {
  const body = req.body;

  const addedContact = await addContact(body);

  res.status(201).json(addedContact);
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await updateContact(contactId, body);

  res.json(contact);
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
  removeContactController,
};
