import { PrismaClient } from "@prisma/client";
import {handle_error} from "../helper/handle_error.js";
import {send_response} from "../helper/send_response.js";

const { user } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const userDetail = await user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        send_response(req,res,"user", userDetail);
    } catch (error) {
        handle_error(error, res);
    }
}

export {
    getUser
}