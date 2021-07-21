import User, { IUser } from "../../../common/entity/user.entity";
import { Model } from "mongoose";
import { BaseRepository } from "../../../common/repository/base.repository";
import * as jwt from "jsonwebtoken";

export class UserService extends BaseRepository<IUser> {
    constructor(public readonly userRepository: Model<IUser>) {
        super(userRepository);
    }

    async createToken (obj: any): Promise<any> {
        const accessToken = jwt.sign(obj, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '30s'});
        const refreshToken = jwt.sign(obj, `${process.env.REFRESH_TOKEN_SECRET}`);
        return {accessToken: accessToken, refreshToken: refreshToken};
    }

    async getUsers(): Promise<any> {
        const data = await User.find();
        return {data: data}
    }
}