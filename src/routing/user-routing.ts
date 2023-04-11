import express from "express";
import userController from "../conrollers/user-controller";

const userRouter = express.Router();

userRouter.route("")
                .get(userController.getAllUsers);
                
userRouter.route("/:id")
                .get(userController.getUserById);

userRouter.route('/login')
                .post(userController.login);

userRouter.route('/register')
                .post(userController.register);
            
            
userRouter.route("/add-image").post(userController.addImageForUser);
          
userRouter.route("/add-cover")
                .post(userController.addCoverForUser);


userRouter.route('/:user1_id/friends/:user2_id').get(userController.areFriends);

export default userRouter;