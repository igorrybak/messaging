import * as express from "express";
import * as bodyParser from "body-parser";

export const router = express.Router();

router.get("/messages", (req, resp) => {
    console.debug("Received data: ", req.query);
    resp.send("Hello API!");
});
