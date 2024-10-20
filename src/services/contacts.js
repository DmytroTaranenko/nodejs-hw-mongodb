import { Contact } from '../models/Contact.js';

export const getAllContacts = async () => {
  return Contact.find();
};

export const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

export function createContact(contact) {
  return Contact.create(contact);
}

export function updateContact(contactId, contact) {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}
