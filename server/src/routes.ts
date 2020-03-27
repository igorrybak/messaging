import * as express from "express";
import { MessageModel, UserModel } from "./db/model";

export const router = express.Router();

router.post("/user", async (req, resp) => {
    console.debug("Received body on /user: ", req.body);
    try {
        if (req.body.createUser) {
            const userModel = new UserModel({
                username: req.body.username,
                password: req.body.password,
            });

            const user = await userModel.save();
            console.log("User created: ", user);
        } else {
            const user = await UserModel.find({
                username: req.body.username,
                password: req.body.password,
            });

            if (user.length) {
                // TODO
            } else {
                // TODO
            }
        }

        resp.send().status(200);
    } catch (error) {
        // TODO
    }
});

router.get("/messages", async (req, resp) => {
    console.debug("Received query on messages: ", req.query);
    try {
        const messages = await MessageModel.find(req.query);
        resp.send(messages).status(200);
    } catch (error) {
        // TODO
    }
});

router.post("/message", async (req, resp) => {
    console.debug("Received body on /message: ", req.body);
    try {
        const messageModel = new MessageModel({
            username: req.body.username,
            recipient: req.body.recipient,
            message: req.body.message,
        });
        const user = await messageModel.save();

        console.log("Message created: ", user);

        resp.send().status(200);
    } catch (error) {
        // TODO
    }
});
