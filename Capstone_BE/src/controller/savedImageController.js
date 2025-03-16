import {handle_error} from "../helper/handle_error.js";
import {PrismaClient} from "@prisma/client";
import {send_response} from "../helper/send_response.js";

const { savedImage } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const saveImage = async (req, res) => {
    try {
        const { userId, imageId } = req.body;

        const existingSave = await savedImage.findUnique({
            where: {
                userId_imageId: {
                    userId,
                    imageId
                }
            }
        });

        if (existingSave) {
            throw new Error({ message: "Image already saved by this user." });
        }

        const newSave = await savedImage.create({
            data: {
                userId,
                imageId
            }
        });

        send_response(req, res, "savedImage", newSave);

    } catch (error) {
        handle_error(error, res);
    }
}

const isSaved = async (req, res) => {
    try {
        const imageId = req.params.imageId;
        const userId = req.query.userId;

        const imageSaved = await savedImage.findUnique({
            where: {
                userId_imageId: { userId, imageId }
            }
        });

        const result = !!imageSaved;

        return res.send(result);
    } catch (error) {
        handle_error(error, res);
    }
}

const getSavedImage = async (req, res) => {
    try{
        const userId = req.params.userId;

        const images = await savedImage.findMany({
            where: { userId },
            include: { image: true }
        });

        send_response(req, res,"savedImage", images);
    } catch (error) {
        handle_error(error, res);
    }
}

export {
    isSaved,
    getSavedImage,
    saveImage
}