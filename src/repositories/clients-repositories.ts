import dbConfig from "../common/db-config";
import Client from "../models/client-model";


const getAllClientsQuerry = async () => {
  const result = await dbConfig.manager.query("SELECT * FROM USERS");
  return result;
};

const getClientByIdQuerry = async (id: string) => {
  const result = await dbConfig.manager.query(
    `SELECT * FROM USERS WHERE id = ?`,
    [id]
  );
  return result;
};

const insertClientQuerry = async (client: Client) => {
  try {
    const result = await dbConfig.manager.query(
      `INSERT INTO USERS (first_name, last_name, e_mail, birth_date, gender, adress) 
      VALUES (?,?,?,?,?,?)`,
      [
        
        client.first_name,
        client.last_name,
        client.e_mail,
        client.birth_date,
        client.gender,
        client.adress,

      ]
    );
    return result;
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

const updateClientQuerry = async (client: Client, id: string) => {
  try {
    await dbConfig.manager.query(
      `UPDATE USERS SET 
      first_name = ?,
      last_name = ?,
      e_mail = ?,
      birth_date = ?,
      gender = ?,
      adress = ? WHERE id = ? `,
      [
        
        client.first_name,
        client.last_name,
        client.e_mail,
        client.birth_date,
        client.gender,
        client.adress,
        id
      ]
    );
    return { success: true, client };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

const deleteClientQuerry = async (id: string) => {
  try {
    await dbConfig.manager.query(`DELETE FROM USERS WHERE id = ?`, [id]);
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

export default {
  getAllClientsQuerry,
  getClientByIdQuerry,
  insertClientQuerry,
  updateClientQuerry,
  deleteClientQuerry,
};
