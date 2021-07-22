import { Schema } from "mongoose";

export interface createIUser {
    name: string,
    gender: string,
    age: number,
    DOB: string,
    username: string,
    password: string,
    password_confirm: string,
    location: string
}

export interface updateIUser {
    name: string,
    gender: string,
    age: number,
    DOB: string,
    username: string,
    password: string,
    password_confirm: string,
    location: string
}

export interface IDIUser {
    idUser: string
}
