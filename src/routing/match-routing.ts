import express from "express";
import matchController from "../conrollers/match-controller";

const matchRouter = express.Router();

matchRouter.route('/all').get(matchController.getAllMatches);

matchRouter.route('/user1-win/:id').put(matchController.user1Win);
matchRouter.route('/user2-win/:id').put(matchController.user2Win);

matchRouter.route('/:sender_id/:receiver_id')
                .post(matchController.addNewMatch);
 
matchRouter.route('/:notification_id').get(matchController.getMatchByNotificationId)
                                      .post(matchController.rejectChallenge)
                                      .put(matchController.acceptChallenge);              


                                       

export default matchRouter;