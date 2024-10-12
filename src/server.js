import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pino from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

export const setupServer = () => {
  const app = express();

  const PORT = process.env.PORT || 3000;

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res, next) => {
    try {
      const data = await getAllContacts()
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const {contactId} = req.params
      const contact = await getContactById(contactId)
      if(!contact ) {
        throw new Error("Contact not found")
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
