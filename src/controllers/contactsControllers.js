const {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
} = require('../services/contactsService');

const listContactsController = async (req, res) => {
  const contacts = await listContacts();

  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getById(contactId);

  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  }

  res.json(contact);
};

const addContactController = async (req, res) => {
  const body = req.body;
  const { name, email, phone } = body;
  const missingFields = [];

  if (!name) {
    missingFields.push('name');
  }
  if (!email) {
    missingFields.push('email');
  }
  if (!phone) {
    missingFields.push('phone');
  }

  if (!name || !email || !phone) {
    res
      .status(400)
      .json({ message: `missing required ${missingFields.join(', ')} field` });
  }

  const addedContact = await addContact(body);

  res.status(201).json(addedContact);
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await updateContact(contactId, body);

  res.json(contact);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  }

  res.json({ message: 'contact deleted' });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
};
