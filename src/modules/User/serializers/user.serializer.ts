import {createIUser} from "../models/user.model";

export interface IUserGet {
    name: String,
    username: String,
    password: String
}

export function serializeGetUser(model: createIUser): IUserGet {
    return {
        name: model.name,
        username: model.username,
        password: model.password
    };
}