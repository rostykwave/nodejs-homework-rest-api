// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
  // try {
  //   const data = await fs.readFile(contactsPath);
  //   return JSON.parse(data);
  // } catch (error) {
  //   console.log("error", error.message);
  // }
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
  // try {
  //   const data = await fs.readFile(contactsPath);
  //   const contacts = JSON.parse(data);
  //   const [contact] = contacts.filter((contact) => contact.id === contactId);
  //   return contact;
  // } catch (error) {
  //   console.log("error", error.message);
  // }
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data.toString());
  const newContact = { id: new Date().getTime().toString(), ...body };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data.toString());
  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;
    }
  });

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
