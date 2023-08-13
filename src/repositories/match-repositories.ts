import dbConfig from "../common/db-config";
import Match from "../models/match-model";

const addNewMatch = async (sender_id: string, receiver_id: string, notification_id: string, name_of_the_game: string, total_stake: number) => {
    try { 
        const result  = await dbConfig.manager.query( 
            `INSERT INTO MATCHES (sender_id, receiver_id, notification_id, name_of_the_game, match_status, total_stake) 
            VALUES (?, ?, ?, ?, 0, ?)`,
            [sender_id, receiver_id, notification_id, name_of_the_game, total_stake]
        );
        return result; 
    } catch (error) {
        console.error(error);
        throw new Error("Failed to add new match.");
    }
};

const getMatchByNotificationId = async (notification_id: string) =>{
    return await dbConfig.manager.query('SELECT * FROM MATCHES WHERE notification_id = ?',
     [notification_id]);
    
}

const rejectChallenge = async (notification_id: string) =>{
    return await dbConfig.manager.query('UPDATE MATCHES SET match_status = ? WHERE notification_id = ?',
     [4, notification_id]);
    
}

const acceptChallenge = async (notification_id: string) =>{
    return await dbConfig.manager.query('UPDATE MATCHES SET match_status = ? WHERE notification_id = ?',
     [1, notification_id]);
    
}

const getAllMatches = async () => {
    return await dbConfig.manager.query('SELECT * FROM MATCHES WHERE match_status IN (1, 2, 3) ORDER BY match_status ASC, id DESC');
  };

  const user1Win = async (id: string) => {
    return await dbConfig.manager.query('UPDATE MATCHES SET match_status = ? WHERE id = ?',
    [2, id]);
  };

  const user2Win = async (id: string) => {
    return await dbConfig.manager.query('UPDATE MATCHES SET match_status = ? WHERE id = ?',
    [3, id]);
  };

export default{addNewMatch,user1Win,user2Win,getMatchByNotificationId,rejectChallenge,acceptChallenge,getAllMatches}
