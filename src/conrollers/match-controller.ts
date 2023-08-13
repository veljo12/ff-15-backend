import { Request, Response } from "express";
import matchRepositories from "../repositories/match-repositories";
import userRepositories from "../repositories/user-repositories";

const addNewMatch = async (req: Request, res: Response) => {
    const sender_id = req.params.sender_id;
    const receiver_id = req.params.receiver_id;
    const name_of_the_game = req.body.name_of_the_game;
    const total_stake = req.body.total_stake;

    const notification_id = await userRepositories.createNotification(sender_id, receiver_id);

    const addNewMatch = await matchRepositories.addNewMatch(sender_id,receiver_id,notification_id, name_of_the_game,total_stake);
  res.send(addNewMatch);
};

const getMatchByNotificationId = async (req: Request, res: Response) => {
  const notification_id = req.params.notification_id;
  
 const result = await matchRepositories.getMatchByNotificationId(notification_id);
 const getMatchByNotificationId = result[0];
res.send(getMatchByNotificationId);
};

const rejectChallenge = async (req: Request, res: Response) => {
  const notification_id = req.params.notification_id;
  
 const rejectChallenge = await matchRepositories.rejectChallenge(notification_id);
 
res.send(rejectChallenge);
};

const acceptChallenge = async (req: Request, res: Response) => {
  const notification_id = req.params.notification_id;
  
 const acceptChallenge = await matchRepositories.acceptChallenge(notification_id);
 
res.send(acceptChallenge);
};

const getAllMatches = async (req: Request, res: Response) => {
  const match = await matchRepositories.getAllMatches();
  res.send(match);
};

const user1Win = async (req: Request, res: Response) => {
  const id = req.params.id;
  
 const result = await matchRepositories.user1Win(id);
 
res.send(result);
};

const user2Win = async (req: Request, res: Response) => {
  const id = req.params.id;
  
 const result = await matchRepositories.user2Win(id);
 
res.send(result);
};





export default{addNewMatch,getAllMatches,user2Win,user1Win, getMatchByNotificationId,rejectChallenge,acceptChallenge};