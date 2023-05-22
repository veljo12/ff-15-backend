import { Request, Response } from "express";
import chatsRepositories from "../repositories/chats-repositories";


const sendMessage = async (req: Request, res: Response) =>{
    const sender_id = req.params.sender_id;
    const receiver_id = req.params.receiver_id;
    const message = req.body.message;


    const sendMessage = await chatsRepositories.sendMessage(sender_id, receiver_id, message);
    res.send(sendMessage);
};

const getLastFiveMessages = async (req: Request, res: Response) => {
    const id = req.params.id;
    const getLastFiveMessages = await chatsRepositories.getLastFiveMessages(id);

    res.send(getLastFiveMessages);
}

const getUnreadMessagesNumber = async (req: Request, res: Response) => {
    const id = req.params.id;
    const getUnreadMessagesNumber = await chatsRepositories.getUnreadMessagesNumber(id);
    res.send(getUnreadMessagesNumber);
}

const senderImagesForChat = async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const senderImagesForChat = await chatsRepositories.senderImagesForChat(id);
    res.send(senderImagesForChat);
  }

const getMessagesBetweenTwoUsers = async (req: Request, res: Response) => {
    const sender_id = req.params.sender_id;
    const receiver_id = req.params.receiver_id;
    const getMessagesBetweenTwoUsers = await chatsRepositories.getMessagesBetweenTwoUsers(sender_id, receiver_id);

    res.send(getMessagesBetweenTwoUsers);
}


export default {sendMessage, getMessagesBetweenTwoUsers, getLastFiveMessages, getUnreadMessagesNumber,senderImagesForChat};
