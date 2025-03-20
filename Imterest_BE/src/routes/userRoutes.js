import express from 'express';
import { getUser } from '../controller/userController.js';
import {middlewareToken} from "../config/jwt.js";

const userRoutes = express.Router();

userRoutes.get("/:id",middlewareToken, getUser);

export default userRoutes;
