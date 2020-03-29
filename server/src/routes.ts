import * as express from "express";
import { Message } from "../../types";
import { MessageModel, UserModel } from "./db/model";
import { getHashedPassword, generateAuthToken } from "./utils";

export const router = express.Router();

router.get("/user", async (req, resp) => {
    try {
        const { username, password } = req.query;

        const hashedPassword = getHashedPassword(password);

        const user = await UserModel.find({
            username,
            password: hashedPassword,
        });

        if (user.length) {
            const authToken = generateAuthToken();
            resp.cookie("AuthToken", authToken, {
                maxAge: 1000 * 60 * 15,
                httpOnly: true,
                signed: true,
            }).status(200);
        } else {
            resp.status(401);
        }
    } catch (error) {
        resp.status(500);
        resp.statusMessage = error;
    }

    resp.send();
});

router.post("/user", async (req, resp) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = getHashedPassword(password);

        const userModel = new UserModel({
            username,
            password: hashedPassword,
        });

        const user = await userModel.save();
        console.log("User created: ", user);

        resp.status(200);
    } catch (error) {
        resp.status(500);
        resp.statusMessage = error;
    }

    resp.send();
});

router.get("/messages", async (req, resp) => {
    let messages: Message[] = [];

    try {
        const authToken = req.cookies["AuthToken"];
        console.debug("Token: ", authToken);

        const { recipient } = req.query;
        messages = await MessageModel.find({ recipient });
        resp.status(200);
    } catch (error) {
        resp.status(500);
        resp.statusMessage = error;
    }

    resp.send(messages);
});

router.post("/message", async (req, resp) => {
    try {
        const { recipient, sender, message } = req.body;

        const messageModel = new MessageModel({
            recipient,
            sender,
            message,
        });

        const user = await messageModel.save();
        console.log("Message created: ", user);

        resp.status(200);
    } catch (error) {
        resp.status(500);
        resp.statusMessage = error;
    }

    resp.send();
});
