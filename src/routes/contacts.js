import express from 'express';
import { createContactController, deleteContactController, getContactController, getContactsController, updateContactController } from '../controllers/contact.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema } from '../validation/contact.js';
import { isValidID } from '../middlewares/isValidId.js';
import {validateBody} from "../middlewares/validateBody.js"



const router = express.Router();
const jsonParser = express.json({
    type: 'application/json',
  });

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id',isValidID, ctrlWrapper(getContactController));

router.post('/', jsonParser, validateBody(contactSchema), ctrlWrapper(createContactController));


router.patch('/:id',isValidID, jsonParser,validateBody(contactSchema), ctrlWrapper(updateContactController));

router.delete('/:id',isValidID, ctrlWrapper(deleteContactController));



export default router;
