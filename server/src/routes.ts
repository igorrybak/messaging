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
            console.log("userModel: ", userModel);
            console.log("User created: ", user);
        } else {
            const user = await UserModel.find(req.body);
        }

        resp.send().status(200);
    } catch (error) {}
});

router.get("/messages", async (req, resp) => {
    console.debug("Received query on messages: ", req.query);
    const messages = await MessageModel.find(req.query);

    resp.send(messages).status(200);
});
