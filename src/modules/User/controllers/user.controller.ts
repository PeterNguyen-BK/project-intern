import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { Schema, model } from "mongoose";
import User, { IUser } from "../../../common/entity/user.entity";
import { createIUser, updateIUser, deleteIUser } from "../models/user.model";
import { serializeGetUser } from "../serializers/user.serializer";


export class UserController {
    public userService: UserService = new UserService(User);
    
    public login = async (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;
        const token = await this.userService.createToken({username: username, password: password});
        if (token) res.status(200).json(token);
        else res.status(401).json({message: "Auth failed"});
    }

    public refresh = async (req: Request, res: Response) => {
        const refreshToken = req.body.refreshToken;
        const accessToken = await this.userService.regenerateAccessToken(refreshToken);
        if (accessToken) res.status(200).json(accessToken);
        else res.sendStatus(403);
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
            let userData: createIUser = req.body;
            const result = await this.userService.createUser(userData);
            res.json(result);
        }
        catch (err) {
            throw err;
        };
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            let filter: deleteIUser = {_id: req.params.id};
            let userData: updateIUser = req.body;
            const result = await this.userService.updateUser(userData, filter);
            res.json(result);
        } catch (error) {
            throw error;
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            let userData: deleteIUser = {
                _id: req.params.id
            }
            const result = await this.userService.delete(userData);
            res.json(result);
        } catch (error) {
            throw error;
        }
    }
}