import { PrismaClient } from "@prisma/client";
import {send_response} from "../helper/send_response.js";
import {handle_error} from "../helper/handle_error.js";

const { comment } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const createComment = async (req, res) => {
    try {
        const imageId = req.params.imageId;
        const { text, userId } = req.body;

        const newComment = await comment.create({
            data: {
                text,
                userId,
                imageId
            }
        });

        send_response(req,res,"comment", newComment);
    } catch (error) {
        handle_error(error, res);
    }
};

const getComments = async (req,res) => {
    try {
        const id = req.params.imageId;
        const comments = await comment.findMany({
            where: {
               imageId: id
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        send_response(req,res,"comment", comments);
    } catch (error) {
        handle_error(error, res);
    }
}

export {
    createComment,
    getComments
}