import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    name: String,
    age: Number,
    DOB: String,
    gender: String,
    location: String,
    username: String,
    password: String,
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    DOB: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export default model<IUser>('User', userSchema);