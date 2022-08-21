const { Contact } = require("../db/contactsModel");
// const { WromgParametersError } = require("../helpers/errors");
const { NotFoundError, MissingFieldsError } = require("../helpers/errors");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new NotFoundError();
  }
  return contact;
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();

  if (!body) {
    throw new MissingFieldsError();
  }

  return contact;
};

const removeContact = async (id) => {
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    // return res.status(404).json({ message: `Not found` });
    throw new NotFoundError();
  }
};

const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, { $set: body });

  if (!contact) {
    // return res.status(404).json({ message: `Not found` });
    throw new NotFoundError();
  }

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
