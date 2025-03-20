import { PrismaClient } from "@prisma/client";
import {handle_error} from "../helper/handle_error.js";
import {send_response} from "../helper/send_response.js";

const { image, user } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const getImages = async (req,res) => {
    try {
        const result = await image.findMany();
        send_response(req,res,"image", result);
    } catch (error) {
        handle_error(error, res);
    }
}

const searchImage = async (req, res) => {
    try {
        const title = req.query.title;

        const images = await image.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive"
                }
            }
        });
        let result = [];

        if (images.length === 0) {
            send_response(req, res, "image", result);
        }

        if (images.length === 1) {
            result = images[0];
        } else {
            result = images;
        }

        send_response(req, res, "image", result);
    } catch (error) {
        handle_error(error, res);
    }
};

const getImageDetail = async (req, res) => {
    try {
        const id = req.params.id;

        const imageDetail = await image.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        send_response(req, res, "image", imageDetail);
    } catch (error) {
        handle_error(error, res);
    }
}

const deleteImage = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await image.delete({
            where: { id }
        });

        res.send(result);
    } catch (error) {
        handle_error(error, res);
    }
}

const getImageByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        const images = await image.findMany({
            where: { creatorId: userId }
        });

        send_response(req, res, "image", images);
    } catch (error) {
        handle_error(error, res);
    }
}

const createImage = async (req, res) => {
    try {
        const { title, creatorId } = req.body;

        if (!creatorId) {
            return res.status(400).json({ message: "Creator ID is missing." });
        }

        const userExisted = await user.findUnique({
            where: { id: creatorId },
        });

        if (!userExisted) {
            return res.status(400).json({ message: "Creator (user) not found." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image file is missing." });
        }

        const newImage = await image.create({
            data: {
                title,
                url: req.file.path,
                creatorId,
            },
        });

        send_response(req, res, "image", newImage);
    } catch (error) {
        console.error('Error:', error);
        handle_error(error, res);
    }
};



export {
    createImage,
    getImages,
    searchImage,
    getImageDetail,
    getImageByUserId,
    deleteImage,
}