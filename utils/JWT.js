import jwt from "jsonwebtoken";
const secret = "MAIL_TRACK";

export const JWT = {
    generate(payload, expiresIn = "30d") {
        return jwt.sign(payload, secret, { expiresIn })
    },
    verify(token) {
        try {
            return jwt.verify(token, secret)
        }catch {
            return false
        }
    }
};