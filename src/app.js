import express from 'express';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import routes from './routes/index.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cookieParser())

app.use('/', routes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
