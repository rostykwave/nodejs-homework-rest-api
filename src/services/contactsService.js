const fs = require('node:fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('src/db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getById = async contactId => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);

  return contactById;
};

const addContact = async body => {
  const { name, email, phone } = body;

  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const updatedContacts = [...contacts, newContact];

  fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();

  const indexOfRemovingContact = contacts.findIndex(
    contact => contact.id === contactId
  );

  if (indexOfRemovingContact === -1) {
    return null;
  }

  const removedContactByID = contacts[indexOfRemovingContact];
  contacts.splice(indexOfRemovingContact, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContactByID;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const indexOfUpdatingContact = contacts.findIndex(
    contact => contact.id === contactId
  );

  if (indexOfUpdatingContact === -1) {
    return undefined;
  }
  const updatingContact = contacts[indexOfUpdatingContact];

  const { name, email, phone } = body;
  updatingContact.name = name;
  updatingContact.email = email;
  updatingContact.phone = phone;

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatingContact;
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
