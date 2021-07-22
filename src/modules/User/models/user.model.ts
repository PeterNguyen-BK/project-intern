import { Schema } from "mongoose";

export interface createIUser {
    name: string,
    gender: string,
    age: Number,
    DOB: String,
    username: String,
    password: String,
    location: String
}

export interface updateIUser {
    name: string,
    gender: string,
    age: number,
    DOB: string,
    username: string,
    password: string,
    location: string
}

export interface deleteIUser {
    idUser: string
}
