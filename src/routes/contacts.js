import express from 'express';
import { createContactController, deleteContactController, getContactController, getContactsController, updateContactController } from '../controllers/contact.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';



const router = express.Router();
const jsonParser = express.json({
    type: 'application/json',
  });

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactController));

router.post('/', jsonParser, ctrlWrapper(createContactController));


router.patch('/:id', jsonParser, ctrlWrapper(updateContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));



export default router;
