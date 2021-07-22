import { UserService } from "../services/user.service";
import { Request, Response } from "express";
// import { IUser } from "../models/user.model";
import { Schema, model } from "mongoose";
import User, { IUser } from "../../../common/entity/user.entity";
import { createIUser, updateIUser, deleteIUser } from "../models/user.model";
import { serializeGetUser } from "../serializers/user.serializer";

export class UserController {
    public userService: UserService = new UserService(User);
    
    public login = async (req: Request, res: Response) => {
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

    public createUser = async (req: Request, res: Response) => {
        try {
            let userData: createIUser = {
                name: req.body.name,
                age: req.body.age,
                DOB: req.body.DOB,
                gender: req.body.gender,
                location: req.body.location,
                username: req.body.username,
                password: req.body.password,
                password_confirm: req.body.password_confirm
            }
            const result = await this.userService.createUser(userData);
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
            const result = await this.userService.updateUser(userData, filter);
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
            const result = await this.userService.deleteUser(userData);
            res.json(result);
        } catch (error) {
            
        }
    }
}