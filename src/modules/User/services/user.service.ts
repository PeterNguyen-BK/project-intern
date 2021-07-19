import { User } from "../../../common/entity/user.entity";
import { Model } from "mongoose";
import { BaseRepository } from "../../../common/repository/base.repository";

export class UserService extends BaseRepository<User> {
    constructor(public readonly userRepository: Model<User>) {
        super(userRepository);
    }
}