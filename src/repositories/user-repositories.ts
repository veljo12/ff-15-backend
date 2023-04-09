
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




export default {login, register, getAllUsersQuerry, getUserByIdQuerry, addImageForUser, addCoverForUser}