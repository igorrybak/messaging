import * as express from "express";

export const router = express.Router();

router.get("/", (req, resp) => {
    resp.send("Hello API!");
});