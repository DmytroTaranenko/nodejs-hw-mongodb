import express from 'express';

import { authenticate } from '../middlewares/authenticate.js';

import authRoutes from './auth.js';
import contactRoutes from './contacts.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', authenticate, contactRoutes);

export default router;
