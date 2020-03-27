import { Message, User } from "@/../../types";
import * as mongoose from "mongoose";
import { db } from "..";

interface IUser extends mongoose.Document, User {}

const messageSchema = new mongoose.Schema({
    name: String,
});

export const UserModel = db.mongoDB.model<IUser>("messages", messageSchema);
