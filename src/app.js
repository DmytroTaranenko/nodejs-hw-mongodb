import express, { json } from 'express';
import path, { join } from 'node:path';

import swaggerUi from "swagger-ui-express"
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import swaggerDocs  from '../docs/swagger.json' with { type: "json"};

import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocs))

app.use('/photos', express.static(path.resolve('src', 'public/photos')));
app.use(cookieParser());

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);




export default app;
