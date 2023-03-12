import express from "express";
import userController from "../conrollers/user-controller";

const userRouter = express.Router();

userRouter.route('/login')
            .post(userController.login);

userRouter.route('/register')
            .post(userController.register);

export default userRouter;