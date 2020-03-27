import { Message } from "@/../../types";
import * as mongoose from "mongoose";
import { db } from "..";

interface IMessage extends mongoose.Document, Message {}

const messageSchema = new mongoose.Schema({
    userId: Number,
    from: String,
    text: String,
});

export const MessageModel = db.mongoDB.model<IMessage>("messages", messageSchema);
