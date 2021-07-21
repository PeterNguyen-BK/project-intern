import { UserService } from "../services/user.service";
import { Request, Response } from "express"
import { Schema, model } from "mongoose";
import User from "../../../common/entity/user.entity";
import { serializeGetUser } from "../serializers/user.serializer";

export class UserController {
    public userService: UserService = new UserService(User);
    
    async login(req: Request, res: Response) {
        const username = req.body.username;
        const token = this.userService.createToken({name: username});
        res.json(token);
    }

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.getUsers();
            res.json(result.data.map((x: any) => serializeGetUser(x)));
        }
        catch(err) {
            throw err;
        }
    }
}