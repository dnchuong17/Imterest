import express from 'express';
import {createComment, getComments} from "../controller/commentController.js";
const commentRoutes = express.Router();

commentRoutes.post('/:imageId', createComment);
commentRoutes.get('/:imageId', getComments);

export default commentRoutes;