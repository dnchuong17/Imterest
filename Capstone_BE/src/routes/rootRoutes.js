import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from "./authRoutes.js";
import imageRoutes from "./imageRoutes.js";
import commentRoutes from "./commentRoutes.js";

import {middlewareToken} from "../config/jwt.js";
import savedImageRoutes from "./savedImageRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use('/users', middlewareToken, userRoutes);
rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/images', middlewareToken,imageRoutes);
rootRoutes.use('/comments', middlewareToken,commentRoutes);
rootRoutes.use('/savedImage', middlewareToken, savedImageRoutes);

export default rootRoutes;