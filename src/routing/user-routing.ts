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


userRouter.route('/:user1_id/friends/:user2_id')
                .get(userController.areFriends)
                .post(userController.sendFriendRequest)
                .delete(userController.cancelFriendRequest)
                .put(userController.acceptFriendRequest);

userRouter.route('/:user1_id/friends/:user2_id/remove')
                .put(userController.removeFriend);

userRouter.route('/:user1_id/friends/:user2_id/status').get(userController.checkFriendshipStatus);

userRouter.route('/notifications/:sender_id/create/:receiver_id')
                .post(userController.createNotification);

userRouter.route('/notifications/:sender_id/send/:receiver_id')
                .post(userController.sendFriendRequestNotification)
                .delete(userController.deleteFriendRequestNotifications);

userRouter.route('/notifications/:sender_id/accept/:receiver_id').post(userController.sendAcceptedFriendRequestNotification);

userRouter.route('/notifications/:sender_id/accept-challenge/:receiver_id').post(userController.sendAcceptedChallengeNotification);

userRouter.route('/notifications/:sender_id/challenge/:receiver_id').post(userController.sendChallengeNotification);

userRouter.route('/notifications/unread/:id').get(userController.getUnreadNotifications);

userRouter.route('/notifications/:id')
                .get(userController.getAllNotifications)
                .put(userController.markNotificationsAsRead);

userRouter.route('/notifications/last/:id').get(userController.getLastFiveNotifications);

userRouter.route('/notifications/images/:id').get(userController.getAllNotificationImages);

userRouter.route('/notifications/last/images/:id').get(userController.getSenderImages);


export default userRouter;