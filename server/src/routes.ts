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

            resp.status(200);
        } else {
            const user = await UserModel.find({
                username: req.body.username,
                password: req.body.password,
            });
            console.debug("User data: ", user);

            if (user.length) {
                resp.status(200);
            } else {
                resp.status(401);
                resp.statusMessage = "Not authorized";
            }
        }
    } catch (error) {
        resp.status(500);
    }

    resp.send();
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
            recipient: req.body.recipient,
            sender: req.body.sender,
            message: req.body.message,
        });
        const user = await messageModel.save();

        console.log("Message created: ", user);

        resp.send().status(200);
    } catch (error) {
        // TODO
    }
});
