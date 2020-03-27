import * as express from "express";

export const router = express.Router();

router.post("/user", (req, resp) => {
    console.debug("Received body on user: ", req.body);
    resp.send().status(200);
});

router.get("/messages", (req, resp) => {
    console.debug("Received query on messages: ", req.query);
    resp.send().status(200);
});
