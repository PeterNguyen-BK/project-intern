import {createUser} from "../models/user.model";

export interface IUserGet {
    name: String,
    username: String,
    password: String
}

export function serializeGetUser(model: createUser): IUserGet {
    return {
        name: model.name,
        username: model.username,
        password: model.password
    };
}