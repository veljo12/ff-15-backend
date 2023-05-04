

import dbConfig from "../common/db-config";
import User from "../models/user-model";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const getAllUsersQuerry = async () => {
    const result = await dbConfig.manager.query("SELECT * FROM USERS");
    
    return result;
  };
  
  const getUserByIdQuerry = async (id: string) => {
    const result = await dbConfig.manager.query(
      `SELECT * FROM USERS WHERE id = ?`,
      [id]
    );
    return result;
  };

  
const login = async (u: User) => {
    u.hashed_password = crypto.createHash('md5').update(u.password).digest('hex');
    const result = await dbConfig.query(`SELECT * FROM USERS WHERE username = ? AND hashed_password = ?`,
    [u.username, u.hashed_password]);
    
    if (result.length > 0){
        // console.log(result);
        
        const isAdmin = result[0].isAdmin === 1; // Check if the user is an admin
        const token = jwt.sign({id: result[0].id, username: u.username, isAdmin: isAdmin}, 'SECRET' );
        
        return {success: true, token }
      }
    else { 
        return {success: false}};
};

    
const register = async (u: User) => {
    u.hashed_password = crypto.createHash('md5').update(u.password).digest('hex');
    const result = await dbConfig.query(`INSERT INTO USERS(username, hashed_password) VALUES (?,?)`,
    [u.username, u.hashed_password]);

    

    if (result.affectedRows > 0){
        const token = jwt.sign({username: u.username, isAdmin: true}, 'SECRET' );
        return {success: true, token}
    }
    else { return {success: false}};
    

};

const addImageForUser = async (id: string, image: string) => {
  const result = await dbConfig.manager.query(
    `UPDATE USERS SET image = ? WHERE id = ?`,
    [image, id]
  );
  return result;
};

const addCoverForUser = async (id: string, cover: string) =>{
  return await dbConfig.manager.query(
    `UPDATE USERS SET cover = ? WHERE id = ?`,
    [cover, id]
  )
}

// Friend Request

const sendFriendRequest = async (user1_id: string, user2_id: string) => {
  try {
      const result = await dbConfig.manager.query(`
      INSERT INTO FRIEND_REQUEST (sender_id, receiver_id, status)
      VALUES (?, ?, 'pending')
    `, [user1_id, user2_id]);

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send friend request.");
  }
};

const cancelFriendRequest = async (user1_id: string, user2_id: string) => {
  try {
    const result = await dbConfig.manager.query(`
    DELETE FROM FRIEND_REQUEST
    WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
    AND status = 'pending'
 
  `, [user1_id, user2_id, user2_id, user1_id]);

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to cancel friend request.");
  }
};

const acceptFriendRequest = async (user1_id: string, user2_id: string) => {
  try{

     const result = await dbConfig.manager.query(`
     UPDATE FRIEND_REQUEST
     SET status = 'accepted'
     WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
     AND status = 'pending' 
     
   `, [user1_id, user2_id, user2_id, user1_id]) 

   return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to accept friend request.");
  }
};

const removeFriend = async (user1_id: string, user2_id: string) => {
  try {
      const result = await dbConfig.manager.query(`
      UPDATE FRIEND_REQUEST
      SET status = ''
      WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
        AND status = 'accepted'
      
    `, [user1_id, user2_id, user2_id, user1_id]);

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove friend.");
  }
};

 

const areFriends = async (user1_id: string, user2_id: string) => {
  try {
    const result = await dbConfig.manager.query(`
      SELECT *
      FROM FRIEND_REQUEST
      WHERE ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?))
        AND status = 'accepted'
    `, [user1_id, user2_id, user2_id, user1_id]);

    return result.length > 0;
  } catch (error) {
    console.error(error);
    

  }
};

const checkFriendshipStatus = async (user1_id: string, user2_id: string) => {
  const result = await dbConfig.manager.query(`
    SELECT status, sender_id
    FROM FRIEND_REQUEST
    WHERE ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?))
      AND (status = 'pending' OR status = '' OR status = 'accepted')
  `, [user1_id, user2_id, user2_id, user1_id]);

  if (result.length > 0) {
    return { status: result[0].status, sender_id: result[0].sender_id }; 
  } else {
    return { status: '', sender_id: null };
  }
};

// Notifications

const sendFriendRequestNotification = async (sender_id: string, receiver_id: string) => {
  const result = await dbConfig.manager.query(`INSERT INTO NOTIFICATIONS (sender_id, receiver_id, status, is_read) VALUES (?, ?, ?, ?)`,[sender_id, receiver_id, 1, 0])
  return result;
}

const deleteFriendRequestNotifications = async (sender_id: string, receiver_id: string) => {
  const result = await dbConfig.manager.query(`DELETE FROM NOTIFICATIONS WHERE sender_id = ? AND receiver_id = ?`, [sender_id, receiver_id])
  return result;
}



const sendAcceptedFriendRequestNotification = async (sender_id: string, receiver_id: string) => {
  const result = await dbConfig.manager.query(`INSERT INTO NOTIFICATIONS (sender_id, receiver_id, status, is_read) VALUES (?, ?, ?, ?)`,[sender_id, receiver_id, 2, 0])
  return result;
}

const getUnreadNotifications = async (id: string) => {
  const result = await dbConfig.manager.query(`SELECT COUNT(*) AS count
    FROM NOTIFICATIONS
    WHERE receiver_id = ? AND is_read = 0`, [id]);
  return result[0].count;
}

const markNotificationsAsRead = async (id: string) => {
  const result = await dbConfig.manager.query(`UPDATE NOTIFICATIONS SET is_read = 1 WHERE receiver_id = ? AND is_read = 0`, [id]);
  return result;
}


const getAllNotifications = async(id: string) => {
  const result = await dbConfig.manager.query(`SELECT * FROM NOTIFICATIONS WHERE receiver_id = ? ORDER BY id DESC`, [id]);
  return result;
}

const getLastFiveNotifications = async(id: string) => {
  const result = await dbConfig.manager.query(`SELECT * FROM NOTIFICATIONS
  WHERE receiver_id = ?
  ORDER BY id DESC
  LIMIT 5`, [id]);
  return result;
}



const getSenderImages = async (id: string) => {
  const result = await dbConfig.manager.query(`
    SELECT USERS.image
    FROM NOTIFICATIONS
    JOIN USERS ON NOTIFICATIONS.sender_id = USERS.id
    WHERE NOTIFICATIONS.receiver_id = ?
    ORDER BY NOTIFICATIONS.id DESC
    LIMIT 5
  `, [id]);

  return result.map((row: { image: string }) => row.image);
}

const getAllNotificationImages = async (id: string) => {
  const result = await dbConfig.manager.query(`
    SELECT USERS.image
    FROM NOTIFICATIONS
    JOIN USERS ON NOTIFICATIONS.sender_id = USERS.id
    WHERE NOTIFICATIONS.receiver_id = ?
    ORDER BY NOTIFICATIONS.id DESC
    
  `, [id]);

  return result.map((row: { image: string }) => row.image);
}


  











export default {sendFriendRequestNotification,getAllNotificationImages,getSenderImages, getLastFiveNotifications, getAllNotifications, deleteFriendRequestNotifications, sendAcceptedFriendRequestNotification, markNotificationsAsRead, getUnreadNotifications,  login, register, getAllUsersQuerry, getUserByIdQuerry, addImageForUser,
   addCoverForUser, sendFriendRequest,cancelFriendRequest,acceptFriendRequest, removeFriend, checkFriendshipStatus, areFriends}