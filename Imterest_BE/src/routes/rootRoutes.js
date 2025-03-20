import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from "./authRoutes.js";
import imageRoutes from "./imageRoutes.js";
import commentRoutes from "./commentRoutes.js";

import savedImageRoutes from "./savedImageRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use('/users', userRoutes);
rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/images',imageRoutes);
rootRoutes.use('/comments',commentRoutes);
rootRoutes.use('/savedImage', savedImageRoutes);

export default rootRoutes;