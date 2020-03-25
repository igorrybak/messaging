import * as mongoose from "mongoose";
import { DB_NAME } from "../config";

/**
 * Mongo DB class-wrapper.
 */
export class MongoDB {
    private readonly uri = process.env.MONGO_URI;
    private readonly mongoDB: mongoose.Mongoose;

    /**
     * Mongo DB class based on Mongoose
     */
    public constructor() {
        this.mongoDB = new mongoose.Mongoose();
        if (!this.uri) throw new Error("Mongo URI is not defined.");
    }

    /**
     * Init MongoDB connection.
     */
    public async init() {
        try {
            await this.mongoDB.connect(this.uri! + DB_NAME, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.debug("MongoDB connected.");
        } catch (error) {
            throw error;
        }
    }
}
