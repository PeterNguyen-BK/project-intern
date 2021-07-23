import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    id: Schema.Types.ObjectId,
    name: string,
    age: number,
    DOB: string,
    gender: string,
    location: string,
    username: string,
    password: string,
    created_at: Date,
    updated_at: Date,
    refresh_token: string
    isDelete: boolean

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
    created_at: { type: Date },
    updated_at: { type: Date },
    refresh_token: { type: String, default: '' },
    isDelete: {type: Boolean, default: false}
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

userSchema.pre("save", async function() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
})

export default model<IUser>('User', userSchema);