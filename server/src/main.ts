import * as bodyParser from "body-parser";
import { config } from "dotenv";
import * as express from "express";
import { PORT } from "./config";
import { MongoDB } from "./db";
import { router } from "./routes";
import * as cors from "cors";

config();

(async () => {
    try {
        const db = new MongoDB();
        await db.init();

        const app = express();

        app.use(cors());
        app.use(express.static(process.cwd() + "/public"));
        app.use(bodyParser.json());

        app.use("/api", router);

        app.listen(PORT, () => {
            console.info(`Listening on http://127.0.0.1:${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
})();
