import express from 'express';
import {getSavedImage, isSaved, saveImage} from "../controller/savedImageController.js";
const savedImageRoutes = express.Router();

savedImageRoutes.get("/:imageId", isSaved);
savedImageRoutes.get("/user/:userId", getSavedImage);
savedImageRoutes.post("/", saveImage);

export default savedImageRoutes;
