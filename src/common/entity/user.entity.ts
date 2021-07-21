import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    DOB: String,
    gender: String,
    location: String,
    username: String,
    password: String,
    password_confirm: String,
    create_at: Date,
    update_at: Date

}

const userSchema = new Schema<IUser>({
    id: {type: Schema.Types.ObjectId, require: true},
    name: { type: String, required: true },
    age: { type: Number, required: true },
    DOB: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
},{
    timestamps: true,
    password_confirm: { type: String, required: true },
    
});

export default model<IUser>('User', userSchema);