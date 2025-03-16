import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createAccessToken = (payload) => {
    return jwt.sign({payload}, process.env.SECRETE_KEY, {
        algorithm: "HS256",
        expiresIn: "1h"
    })
}

const middlewareToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ error: 'Unauthorized'});
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        req.user = decoded.payload;
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Unauthorized: Invalid token' });
    }
}


export {
    createAccessToken,
    middlewareToken
}