import express from 'express';
import { getUser } from '../controller/userController.js';

const userRoutes = express.Router();

userRoutes.get("/:id", getUser);

export default userRoutes;
