import {createIUser} from "../models/user.model";

export interface IUserCreateResponse {
    name: string,
    age: number,
    gender: string,
    DOB: string,
    location: string,
    username: string,
}

export function serializeGetUser(model: createIUser): IUserCreateResponse {
    return {
        name: model.name,
        age: model.age,
        gender: model.gender,
        DOB: model.DOB,
        location: model.location,
        username: model.username
    };
}