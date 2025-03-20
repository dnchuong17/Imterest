import express from 'express';
import {createComment, getComments} from "../controller/commentController.js";
import {middlewareToken} from "../config/jwt.js";
const commentRoutes = express.Router();

commentRoutes.post('/:imageId', middlewareToken, createComment);
commentRoutes.get('/:imageId', middlewareToken, getComments);

export default commentRoutes;