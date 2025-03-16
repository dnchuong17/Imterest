import express from 'express';
import {
    createImage,
    deleteImage,
    getImageByUserId,
    getImageDetail,
    getImages,
    searchImage
} from "../controller/imageController.js";
const imageRoutes = express.Router();

imageRoutes.post("/", createImage);
imageRoutes.get("/", getImages);
imageRoutes.get("/search",searchImage);
imageRoutes.get("/:id", getImageDetail);
imageRoutes.get("/user/:userId", getImageByUserId);
imageRoutes.delete('/:id', deleteImage);

export default imageRoutes;
