import express from 'express';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRoutes from './routes/contacts.js';


const app = express();

app.use('/contacts', contactsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
