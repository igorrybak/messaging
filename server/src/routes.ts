import * as express from "express";
import { db } from "./db";
import { MessageModel } from "./db/model";

export const router = express.Router();

router.post("/user", (req, resp) => {
    console.debug("Received body on user: ", req.body);

    resp.send().status(200);
});

router.get("/messages", async (req, resp) => {
    console.debug("Received query on messages: ", req.query);
    // const messages = await db.getMessages(req.query.user);
    const messages = await MessageModel.find(req.query);

    resp.send({ messages }).status(200);
});
