import { Schema } from "mongoose";

export interface createIUser {
    name: string,
    gender: string,
    age: Number,
    DOB: String,
    username: String,
    password: String,
    password_confirm: String,
    location: String
}

export interface updateIUser {
    name: string,
    gender: string,
    age: number,
    DOB: Date,
    username: string,
    password: string,
    password_confirm: string,
    location: string
}

export interface deleteIUser {
    id: string
}
