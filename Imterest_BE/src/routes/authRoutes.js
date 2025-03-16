import express from 'express';
import {login, register} from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.use('/login', login);
authRoutes.use('/register', register);

export default authRoutes;