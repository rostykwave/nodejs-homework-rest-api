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

    if (!contact) {
      throw new NotFoundError();
    }

    return contact;
  } catch (error) {
    throw new NotFoundError();
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
};

const updateStatusContact = async (id, body) => {
  const { favorite } = body;
  if (!favorite) {
    throw new MissingFieldsError("missing fields favorite");
  }

  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { $set: { favorite } },
      {
        new: true,
      }
    );
    return contact;
  } catch (error) {
    throw new NotFoundError(error);
  }
};

const removeContact = async (id) => {
  try {
    const contact = await Contact.findByIdAndRemove(id);
    if (!contact) {
      // return res.status(404).json({ message: `Not found` });
      throw new NotFoundError();
    }
  } catch (error) {
    throw new NotFoundError();
  }
};
module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
