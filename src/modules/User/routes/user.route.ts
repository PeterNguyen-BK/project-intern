import express, { Application, Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../../../middlewares/auth.middleware";
import { commonValidateBody } from "../../../middlewares/validate.middleware";
import { ValidateQuery } from "../../../middlewares/searchuser.middleware";
import { searchUserSchema } from "../DTO/user.dto";


export class UserRoute {
    public userController: UserController = new UserController();

    public routes = (app: Application) => {
        app.route('/v1/users')
            .get(this.userController.getAllUsers);

        app.route('/users')
            .get(ValidateQuery(searchUserSchema),this.userController.searchUser);
        
        app.route('/v1/users/create')
            .put(this.userController.createUser);
        app.route('/v1/users/update')
            .put(this.userController.updateUser);
        app.route('/v1/users/delete')
            .delete(this.userController.deleteUser);
    }
}