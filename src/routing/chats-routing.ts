import express from "express";
import chatsController from "../conrollers/chats-controller";

const chatsRouter = express.Router();

chatsRouter.route('/:sender_id/message/:receiver_id')
                            .get(chatsController.getMessagesBetweenTwoUsers)
                            .post(chatsController.sendMessage);

chatsRouter.route('/messages/:id').get(chatsController.getAllMessages)
                                  .put(chatsController.markMessagesAsRead);

chatsRouter.route('/unread/:id').get(chatsController.getUnreadMessagesNumber);

chatsRouter.route('/last/images/:id').get(chatsController.senderImagesForChat);




export default chatsRouter;