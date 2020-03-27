import * as mongoose from "mongoose";
import { DB_NAME } from "../config";

/**
 * Mongo DB class-wrapper.
 */
export class MongoDB {
    private readonly uri = process.env.MONGO_URI;
    public mongoDB: mongoose.Mongoose;

    /**
     * Mongo DB class based on Mongoose
     */
    public constructor() {
        this.mongoDB = new mongoose.Mongoose();
        if (!this.uri) throw new Error("Mongo URI is not defined.");
        
        this.connect();
    }

    /**
     * Init MongoDB connection.
     */
    private connect() {
        try {
            this.mongoDB.connect(this.uri! + DB_NAME, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.debug("MongoDB connected.");
        } catch (error) {
            throw error;
        }
    }
}
