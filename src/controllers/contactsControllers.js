const {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
} = require('../services/contactsService');
const { RequestError } = require('../helpers');

const listContactsController = async (req, res) => {
  const contacts = await listContacts();

  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getById(contactId);

  if (!contact) {
    throw RequestError(404);
  }

  res.json(contact);
};

const addContactController = async (req, res) => {
  const body = req.body;

  const addedContact = await addContact(body);

  res.status(201).json(addedContact);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) {
    throw RequestError(404);
  }

  res.json({ message: 'contact deleted' });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await updateContact(contactId, body);

  if (!contact) {
    throw RequestError(404);
  }

  res.json(contact);
};

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
};
