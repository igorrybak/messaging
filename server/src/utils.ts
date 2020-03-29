import * as crypto from "crypto";

export const generateAuthToken = () => {
    return crypto.randomBytes(30).toString("hex");
};

export const getHashedPassword = (password: string) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}