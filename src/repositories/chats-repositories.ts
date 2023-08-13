import dbConfig from "../common/db-config";


const sendMessage = async (sender_id: string, receiver_id: string, message: string) =>{
    const result = await dbConfig.manager.query('INSERT INTO CHATS (sender_id, receiver_id, message, is_read) VALUES (?,?,?,?)',[sender_id, receiver_id, message, 0]);
    return result;
};

const getUnreadMessagesNumber = async (id: string) => {
    const result = await dbConfig.manager.query(`SELECT COUNT(*) AS count
      FROM CHATS
      WHERE receiver_id = ? AND is_read = 0`, [id]);
    return result[0].count;
  }
  const markMessagesAsRead = async (id: string) => {
    const result = await dbConfig.manager.query(`UPDATE CHATS SET is_read = 1 WHERE receiver_id = ? AND is_read = 0`, [id]);
    return result;
  }
  const getAllMessages = async (id: string) =>{
    const result = await dbConfig.manager.query(`
    SELECT *
    FROM CHATS
    WHERE sender_id = ? OR receiver_id = ?
    ORDER BY message_time DESC
    
  `, [id, id]);
return result}



const senderImagesForChat = async (id: string) => {
  const result = await dbConfig.manager.query(`
    SELECT USERS.image AS sender_image
    FROM USERS
    WHERE USERS.id = ?
  `, [id]);

  return result.length > 0 ? result[0].sender_image : null;
};





const getMessagesBetweenTwoUsers = async (sender_id: string, receiver_id: string) => {
  const result = await dbConfig.manager.query(`
  SELECT * FROM CHATS WHERE ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?))`, [sender_id, receiver_id, receiver_id, sender_id]);
  return result;
}


export default {sendMessage,markMessagesAsRead, getMessagesBetweenTwoUsers, getAllMessages, getUnreadMessagesNumber,senderImagesForChat};