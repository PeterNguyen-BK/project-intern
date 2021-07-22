import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    id: Schema.Types.ObjectId,
    idUser: Number,
    name: String,
    age: Number,
    DOB: String,
    gender: String,
    location: String,
    username: String,
    password: String,
    created_at: Date,
    updated_at: Date,
    refresh_token: String

}

const userSchema = new Schema<IUser>({
    id: {type: Schema.Types.ObjectId, require: true},
    idUser: {type: Number, required: true},
    name: { type: String, required: true },
    age: { type: Number, required: true },
    DOB: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date },
    refresh_token: { type: String, default: '' }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

export default model<IUser>('User', userSchema);