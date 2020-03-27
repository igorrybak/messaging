import { User } from "@/../../types";
import * as mongoose from "mongoose";
import { db } from "..";

interface IUser extends mongoose.Document, User {}

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

export const UserModel = db.mongoDB.model<IUser>("users", userSchema);
