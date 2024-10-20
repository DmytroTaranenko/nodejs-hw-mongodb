import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res, next) {
  const { id } = req.params;

  const contact = await getContactById(id);

  if (!contact) {
    return next(new createHttpError.NotFound('Student not found:('));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

export async function createContactController(req, res, next) {

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  
  if(!req.body.email && !req.body.phoneNumber && !req.body.contactType){
    throw createHttpError(400, "Please check required field they cant to be empty")
  }

  const result = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });

}

export async function updateContactController(req, res, next) {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await updateContact(id, contact);

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res, next) {
  const { id } = req.params;

  const result = await deleteContact(id);

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).json({});
}
