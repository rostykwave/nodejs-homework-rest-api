const { Contact } = require('../models/contact');

const listContacts = async (owner, page, limit) => {
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email');

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
