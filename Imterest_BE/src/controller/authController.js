import { createAccessToken } from "../config/jwt.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {PrismaClient} from '@prisma/client';
import {send_response} from "../helper/send_response.js";
import {handle_error} from "../helper/handle_error.js";

dotenv.config();

const { user } = new PrismaClient();

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await user.findUnique({
            where: { email: email },
        });

        if (userExists) {
            return res.status(400).json({ message: "Account existed, please login!" });
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = await user.create({
            data: {
                name,
                email,
                password: hashPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return res.send(newUser);
    } catch (error) {
        handle_error(error, res);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await user.findUnique({ where: { email } });

        if (!user || !bcrypt.compareSync(password, existUser.password)) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const payload = {
            id: existUser.id,
            name: existUser.name
        }
        const token = createAccessToken(payload);

        res.send(token);
    } catch (error){
        handle_error(error, res);
    }
};


export { register, login };