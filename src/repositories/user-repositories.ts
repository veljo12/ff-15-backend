import dbConfig from "../common/db-config";
import User from "../models/user-model";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const login = async (u: User) => {
    u.hashed_password = crypto.createHash('md5').update(u.password).digest('hex');
    const result = await dbConfig.query(`SELECT * FROM USERS WHERE username = ? AND hashed_password = ?`,
    [u.username, u.hashed_password]);

    

    if (result.length > 0){
        const token = jwt.sign({username: u.username}, 'SECRET' );
        return {success: true, token}
    }
    else { return {success: false}};
    

};

const register = async (u: User) => {
    u.hashed_password = crypto.createHash('md5').update(u.password).digest('hex');
    const result = await dbConfig.query(`INSERT INTO USERS(username, hashed_password) VALUES (?,?)`,
    [u.username, u.hashed_password]);

    

    if (result.affectedRows > 0){
        const token = jwt.sign({username: u.username}, 'SECRET' );
        return {success: true, token}
    }
    else { return {success: false}};
    

};




export default {login, register}