const fs = require('node:fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (err) {
    console.log('Error: ', err.message);
    return err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const contactById = contacts.find(contact => contact.id === contactId);

    return contactById;
  } catch (err) {
    console.log('Error: ', err.message);
    return err;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const indexOfRemovingContact = contacts.findIndex(
      contact => contact.id === contactId
    );
    if (indexOfRemovingContact === -1) {
      return -1;
    }
    const removedContactByID = contacts[indexOfRemovingContact];
    contacts.splice(indexOfRemovingContact, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContactByID;
  } catch (err) {
    console.log('Error: ', err.message);
    return err;
  }
}

async function addContact(name, email, phone) {
  try {
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
  } catch (err) {
    console.log('Error: ', err.message);
    return err;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
