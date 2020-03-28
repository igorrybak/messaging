import * as express from "express";
import { MessageModel, UserModel } from "./db/model";
import { Message } from "../../types";

export const router = express.Router();

router.get("/user", async (req, resp) => {
    try {
        const user = await UserModel.find({
            username: req.query.username,
            password: req.query.password,
        });

        if (user.length) {
            resp.status(200);
        } else {
            resp.status(401);
            // resp.cookie("auth_token", "XXXXXXXX");
        }
    } catch (error) {
        resp.status(500);
        resp.statusMessage = error;
    }

    resp.send();
});

router.post("/user", async (req, resp) => {
    try {
        const userModel = new UserModel({
            username: req.body.username,
            password: req.body.password,
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

// router.post("/user", async (req, resp) => {
//     console.log("Cookies: ", req.cookies);
//     console.log("Signed Cookies: ", req.signedCookies);
//     console.debug("Received body on /user: ", req.body);

//     try {
//         if (req.body.createUser) {
//             const userModel = new UserModel({
//                 username: req.body.username,
//                 password: req.body.password,
//             });

//             const user = await userModel.save();
//             console.log("User created: ", user);

//             resp.status(200);
//         } else {
//             const user = await UserModel.find({
//                 username: req.body.username,
//                 password: req.body.password,
//             });
//             console.debug("User data: ", user);

//             if (user.length) {
//                 resp.status(200);
//             } else {
//                 resp.status(401);
//                 resp.cookie("auth_token", "XXXXXXXX");
//                 resp.setHeader("WWW-Authenticate", "Basic");
//             }
//         }
//     } catch (error) {
//         resp.status(500);
//     }

//     resp.send();
// });

router.get("/messages", async (req, resp) => {
    let messages: Message[] = [];

    try {
        messages = await MessageModel.find(req.query);
        resp.status(200);
    } catch (error) {
        resp.status(500);
        resp.statusMessage = error;
    }

    resp.send(messages);
});

router.post("/message", async (req, resp) => {
    try {
        const messageModel = new MessageModel({
            recipient: req.body.recipient,
            sender: req.body.sender,
            message: req.body.message,
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
