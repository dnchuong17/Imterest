import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";


dotenv.config();
const { user } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const createAccessToken = (payload) => {
    console.log(payload);
    return jwt.sign({payload}, process.env.SECRETE_KEY, {
        algorithm: "HS256",
        expiresIn: "1h"
    })
}

const verifyAccessToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.SECRETE_KEY);
    } catch (error) {
        return false;
    }
}

const middlewareToken = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const checkToken = verifyAccessToken(authorization);
    if (!checkToken) {
        return res.status(401).send({ error: 'Unauthorized' });
    }


    const userId = checkToken.payload.userId;

    const userExist = await user.findFirst({
        where: {
            id: userId
        }
    });

    if (!userExist) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    req.userId = userId;
    next();
};



export {
    createAccessToken,
    middlewareToken
}