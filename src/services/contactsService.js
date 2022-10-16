const { Contact } = require('../models/contact');

const listContacts = async () => {
  const contacts = await Contact.find({}, '-createdAt -updatedAt');

  return contacts;
};

const getById = async contactId => {
  const contactById = await Contact.findById(
    contactId,
    '-createdAt -updatedAt'
  );

  return contactById;
};

const addContact = async body => {
  const newContact = await Contact.create(body);

  return newContact;
};

const removeContact = async contactId => {
  const removedContactByID = await Contact.findByIdAndRemove(contactId);

  return removedContactByID;
};

const updateContact = async (contactId, body) => {
  const updatingContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return updatingContact;
};
const updateStatusContact = async (contactId, body) => {
  const updatingStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    body,
    {
      new: true,
    }
  );

  return updatingStatusContact;
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
