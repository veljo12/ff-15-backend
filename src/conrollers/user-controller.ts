import { Request, Response } from "express";
import userRepositories from "../repositories/user-repositories";


const getAllUsers = async (req: Request, res: Response) => {
    const users = await userRepositories.getAllUsersQuerry();
    res.send(users);
};

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const getUserResult = await userRepositories.getUserByIdQuerry(id);
    const getUserById = getUserResult[0];
    res.send(getUserById);
};


const login = async (req: Request, res: Response) => {
    const result = await userRepositories.login(req.body);
    res.send(result);
};

const register = async (req: Request, res: Response) => {
    const result = await userRepositories.register(req.body);
    res.send(result);
};

const addImageForUser = async (req: Request, res: Response) => {
  console.log('addImageForUser called with body:', req.body);
    const addImageForUser = await userRepositories.addImageForUser(
      req.body.id,
      req.body.image
    );
    res.send(addImageForUser);
  };
  
  const addCoverForUser = async (req: Request, res: Response) => {
    const addCoverForUser = await userRepositories.addCoverForUser(
      req.body.id,
      req.body.cover
    );
    res.send(addCoverForUser);
  };


  // Friend Request

  const sendFriendRequest = async (req: Request, res: Response) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    const sendFriendRequest = await userRepositories.sendFriendRequest(user1_id, user2_id);
    res.send(sendFriendRequest);
  }

  const cancelFriendRequest = async (req: Request, res: Response) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    const cancelFriendRequest = await userRepositories.cancelFriendRequest(user1_id, user2_id);
    res.send(cancelFriendRequest);
  }

  const acceptFriendRequest = async (req: Request, res: Response) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    const acceptFriendRequest = await userRepositories.acceptFriendRequest(user1_id, user2_id);
    res.send(acceptFriendRequest);
  }

  const removeFriend = async (req: Request, res: Response) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    const removeFriend = await userRepositories.removeFriend(user1_id, user2_id);
    res.send(removeFriend);
  }

  const areFriends = async (req: Request, res: Response) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    const areFriends = await userRepositories.areFriends(user1_id, user2_id);
    res.send(areFriends);
};

const checkFriendshipStatus = async (req: Request, res: Response) => {
  const user1_id = req.params.user1_id;
  const user2_id = req.params.user2_id;
  
  const checkFriendshipStatus = await userRepositories.checkFriendshipStatus(user1_id, user2_id);
  res.send(checkFriendshipStatus);
};

  // Notifications

const sendFriendRequestNotification = async (req: Request, res: Response) => {
  const sender_id = req.params.sender_id;
  const receiver_id = req.params.receiver_id;

  const sendFriendRequestNotification = await userRepositories.sendFriendRequestNotification(sender_id,receiver_id);
  res.send(sendFriendRequestNotification);
};

const deleteFriendRequestNotifications = async (req: Request, res: Response) => {
  const sender_id = req.params.sender_id;
  const receiver_id = req.params.receiver_id;

  const deleteFriendRequestNotifications = await userRepositories.deleteFriendRequestNotifications(sender_id,receiver_id);
  res.send(deleteFriendRequestNotifications);
};

const sendAcceptedFriendRequestNotification = async (req: Request, res: Response) => {
  const sender_id = req.params.sender_id;
  const receiver_id = req.params.receiver_id;

  const sendAcceptedFriendRequestNotification = await userRepositories.sendAcceptedFriendRequestNotification(sender_id,receiver_id);
  res.send(sendAcceptedFriendRequestNotification);
};

const getUnreadNotifications = async (req: Request, res: Response) => {
  const id = req.params.id;

  const getUnreadNotifications = await userRepositories.getUnreadNotifications(id);
  res.send(getUnreadNotifications);
}

const getAllNotifications = async (req: Request, res: Response) => {
  const id = req.params.id;

  const getAllNotifications = await userRepositories.getAllNotifications(id);
  res.send(getAllNotifications);
}

const getLastFiveNotifications = async (req: Request, res: Response) => {
  const id = req.params.id;

  const getLastFiveNotifications = await userRepositories.getLastFiveNotifications(id);
  res.send(getLastFiveNotifications);
}
const markNotificationsAsRead = async(req: Request, res: Response)=>{
  const id = req.params.id;

  const markNotificationsAsRead = await userRepositories.markNotificationsAsRead(id);
  res.send(markNotificationsAsRead);
}

const getSenderImages = async (req: Request, res: Response) => {
  const id = req.params.id;

  const getSenderImages = await userRepositories.getSenderImages(id);
  res.send(getSenderImages);
}
const getAllNotificationImages = async (req: Request, res: Response) => {
  const id = req.params.id;

  const getAllNotificationImages = await userRepositories.getAllNotificationImages(id);
  res.send(getAllNotificationImages);
}


export default{login,getAllNotificationImages, getSenderImages, markNotificationsAsRead, getLastFiveNotifications, getAllNotifications, deleteFriendRequestNotifications, getUnreadNotifications, sendAcceptedFriendRequestNotification, sendFriendRequestNotification, register, getAllUsers, getUserById, addImageForUser, 
  addCoverForUser, sendFriendRequest,cancelFriendRequest, acceptFriendRequest, removeFriend, checkFriendshipStatus,  areFriends}