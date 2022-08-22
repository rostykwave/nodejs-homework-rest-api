const { Contact } = require("../db/contactsModel");
// const { WromgParametersError } = require("../helpers/errors");
const { NotFoundError, MissingFieldsError } = require("../helpers/errors");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  // const contact = await Contact.findById(id);
  // if (!contact) {
  //   throw new NotFoundError();
  // }
  // return contact;

  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    throw new NotFoundError(error);
  }
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();

  if (!body) {
    throw new MissingFieldsError();
  }

  return contact;
};

const updateContact = async (id, body) => {
  if (!body) {
    // return res.status(400).json({ message: "missing fields" });
    throw new MissingFieldsError("missing fields");
  }

  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
      }
    );
    return contact;
  } catch (error) {
    throw new NotFoundError(error);
  }

  // const contact = await Contact.findByIdAndUpdate(
  //   id,
  //   { $set: body },
  //   {
  //     new: true,
  //   }
  // );

  // if (!contact) {
  //   // return res.status(404).json({ message: `Not found` });
  //   throw new NotFoundError();
  // }

  // return contact;
};

const removeContact = async (id) => {
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    // return res.status(404).json({ message: `Not found` });
    throw new NotFoundError();
  }
};
module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
