import express, { Application, Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../../../middlewares/auth.middleware";
import { commonValidateBody } from "../../../middlewares/validate.middleware";

export class UserRoute {
    public userController: UserController = new UserController();

    public routes = (app: Application) => {
        app.route('/v1/users')
            .get(this.userController.getAllUsers);

        app.route('/users')
            .get(this.userController.searchUser);
        
        app.route('/v2/users/1')
            .post(this.userController.createUser)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
    }
}