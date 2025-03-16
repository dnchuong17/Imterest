import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export const send_response = async (req, res, table, data, params = {}, format = "auto") => {
    let result;

    if (format === "object") {
        result = Array.isArray(data) && data.length > 0 ? data[0] : null;
    } else if (format === "array") {
        result = data;
    } else {
        result = (Array.isArray(data) && data.length === 1) ? data[0] : data;
    }

    const total = Array.isArray(data) ? data.length : (data ? 1 : 0);

    res.send({
        total,
        data: result
    });
}
