// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./contacts.json");

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

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
