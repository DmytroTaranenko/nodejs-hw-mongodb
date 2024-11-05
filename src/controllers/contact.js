import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data
  });
}

export async function getContactController(req, res, next) {
  const { id } = req.params;

  const contact = await getContactById(id);

  if (!contact) {
    return next(new createHttpError.NotFound('Contact not found'));
  }

  if(contact.userId.toString() !== req.user.id.toString() ){
    return next(new createHttpError.Forbidden('Contact not forbidden'));
    
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
    userId: req.user.id
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

  if(contact.userId.toString() !== req.user.id.toString() ){
    return next(new createHttpError.Forbidden('Contact not forbidden'));
    
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res, next) {
  const { id } = req.params;

  const contact = await getContactById(id);
    if (!contact) {
      return next(new createHttpError.NotFound('Contact not found'));
    }

    if (contact.userId.toString() !== req.user.id.toString()) {
      return next(new createHttpError.Forbidden('Access denied to contact'));
    }

  const result = await deleteContact(id);

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).json({});
}
