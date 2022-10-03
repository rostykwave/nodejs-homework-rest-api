const fs = require("node:fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("src/db/contacts.json");
const { NotFoundError, MissingFieldsError } = require("../helpers/errors");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactById = contacts.find((contact) => contact.id === contactId);

  if (!contactById) {
    throw new NotFoundError();
  }

  return contactById;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  if (!body) {
    throw new MissingFieldsError("missing fields");
  }

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

const updateContact = async (contactId, body) => {
  if (!body) {
    throw new MissingFieldsError("missing fields");
  }

  const contacts = await listContacts();

  const indexOfUpdatingContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (indexOfUpdatingContact === -1) {
    throw new NotFoundError();
  }

  const updatingContact = contacts[indexOfUpdatingContact];

  const { name, email, phone } = body;
  updatingContact.name = name;
  updatingContact.email = email;
  updatingContact.phone = phone;

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatingContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const indexOfRemovingContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexOfRemovingContact === -1) {
    throw new NotFoundError();
  }
  const removedContactByID = contacts[indexOfRemovingContact];
  contacts.splice(indexOfRemovingContact, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContactByID;
};
module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
