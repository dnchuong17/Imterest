import express from 'express';
import {
    createImage,
    deleteImage,
    getImageByUserId,
    getImageDetail,
    getImages,
    searchImage,
    uploadImage
} from "../controller/imageController.js";
import {Cloudinary} from "../config/cloudinary.config.js";
const imageRoutes = express.Router();

imageRoutes.post("/", createImage);
imageRoutes.get("/", getImages);
imageRoutes.get("/search",searchImage);
imageRoutes.get("/:id", getImageDetail);
imageRoutes.get("/user/:userId", getImageByUserId);
imageRoutes.delete('/:id', deleteImage);
imageRoutes.post('/upload-image', Cloudinary.single("image"), uploadImage);

export default imageRoutes;
