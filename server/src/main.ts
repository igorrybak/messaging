import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { PORT, HOST_NAME } from "./config";
import { config } from "dotenv";
// import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";

config();

import { router } from "./routes";

(async () => {
    try {
        const app = express();

        app.use(morgan("dev"));
        app.use(cors());
        app.use(express.static(process.cwd() + "/public"));
        app.use(bodyParser.json());
        // app.use(cookieParser("abcdef-12345"));

        app.use("/api", router);

        app.listen(PORT, () => {
            console.info(`Listening on ${HOST_NAME}:${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
})();
