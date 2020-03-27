import * as bodyParser from "body-parser";
import * as cors from "cors";
import { config } from "dotenv";
import * as express from "express";
import { PORT, HOST_NAME } from "./config";
import { router } from "./routes";

config();

(async () => {
    try {
        const app = express();

        app.use(cors());
        app.use(express.static(process.cwd() + "/public"));
        app.use(bodyParser.json());

        app.use("/api", router);

        app.listen(PORT, () => {
            console.info(`Listening on ${HOST_NAME}:${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
})();
