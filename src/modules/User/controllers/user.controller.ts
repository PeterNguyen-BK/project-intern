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

    public createUser = async (req: Request, res: Response) => {
        try {
            let userData = {
                name: req.body.name,
                age: req.body.age,
                DOB: req.body.DOB,
                gender: req.body.gender,
                location: req.body.location,
                username: req.body.username,
                password: req.body.password,
                password_confirm: req.body.password_confirm
            }
            const result = await this.userService.create(userData);
            res.json(result);
        }
        catch (err) {
            throw err;
        };
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            let filter = req.body.id;
            let userData = {
                name: req.body.name,
                age: req.body.age,
                DOB: req.body.DOB,
                gender: req.body.gender,
                location: req.body.location,
                username: req.body.username,
                password: req.body.password,
                password_confirm: req.body.password_confirm
            }
            const result = await this.userService.update(userData, filter);
            res.json(result);
        } catch (error) {
            throw error;
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            let userData = {
                id: req.body.id
            }
            const result = await this.userService.delete(userData);
            res.json(result);
        } catch (error) {
            
        }
    }
}