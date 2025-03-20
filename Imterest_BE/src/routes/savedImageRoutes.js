import express from 'express';
import {getSavedImage, isSaved, saveImage} from "../controller/savedImageController.js";
import {middlewareToken} from "../config/jwt.js";
const savedImageRoutes = express.Router();

savedImageRoutes.get("/:imageId", isSaved);
savedImageRoutes.get("/user/:userId",middlewareToken, getSavedImage);
savedImageRoutes.post("/",middlewareToken, saveImage);

export default savedImageRoutes;
