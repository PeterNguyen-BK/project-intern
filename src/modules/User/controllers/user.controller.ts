import { UserService } from "../services/user.service";
import { Request, Response } from "express";
// import { IUser } from "../models/user.model";
import { Schema, model } from "mongoose";
import User from "../../../common/entity/user.entity";

export class UserController {
    public userService: UserService = new UserService(User);
    
    async login(req: Request, res: Response) {
        const username = req.body.username;
        const token = this.userService.createToken({name: username});
        res.json(token);
    }

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const data = await this.userService.getUsers();
            res.json({Users: data});
        }
        catch(err) {
            throw err;
        }
    }

    public searchUser = async (req: Request, res: Response) => {
        try {
            const data = await this.userService.searchUser(req);
            res.json({Users: data});
        }
        catch(err) {
            throw err;
        }
    }
}