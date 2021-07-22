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
            .get(authenticateToken, this.userController.getAllUsers)
            .post(this.userController.createUser);

        app.route('/v1/users/search')
            .get(ValidateQuery(searchUserSchema),this.userController.searchUser);
        
        app.route('/v1/users/:id')
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);

        app.route('/v1/users/login')
            .post(this.userController.login);
        
        app.route('/v1/users/refresh')
            .post(this.userController.refresh);
    }
}