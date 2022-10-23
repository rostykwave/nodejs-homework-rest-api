const {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../services/contactsService');
const { RequestError } = require('../helpers');

const listContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const contacts = await listContacts(owner, page, limit);

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
  const { _id: owner } = req.user;

  const addedContact = await addContact({ ...req.body, owner });

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

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await updateStatusContact(contactId, body);

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
  updateStatusContactController,
};
