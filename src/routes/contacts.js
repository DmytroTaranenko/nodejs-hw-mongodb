import express from 'express';
import {
  createContactController,
  deleteContactController,
  getContactController,
  getContactsController,
  updateContactController,
} from '../controllers/contact.js';

import {upload} from "../middlewares/upload.js"

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema, updateContactSchema } from '../validation/contact.js';
import { isValidID } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

const contactRoutes = express.Router();
const jsonParser = express.json({
  type: 'application/json',
});

contactRoutes.get('/', ctrlWrapper(getContactsController));

contactRoutes.get('/:id', isValidID, ctrlWrapper(getContactController));

contactRoutes.post(
  '/',
  upload.single("photo"),
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

contactRoutes.patch(
  '/:id',
  isValidID,
  upload.single("photo"),
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

contactRoutes.delete('/:id', isValidID, ctrlWrapper(deleteContactController));

export default contactRoutes;
