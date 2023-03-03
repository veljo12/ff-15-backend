import dbConfig from "../common/db-config";
import Game from "../models/game-model";

const getAllGamesQuerry = async () => {
  const result = await dbConfig.manager.query("SELECT * from GAMES");
  return result;
};

const getGameByIdQuerry = async (id: string) => {
  const result = await dbConfig.manager.query(
    `SELECT * from GAMES WHERE id = ?`,
    [id]
  );
  return result;
};

const insertGameQuerry = async (game: Game) => {
  try {
    const result = await dbConfig.manager.query(
      `INSERT INTO GAMES (name_of_the_game, genre) VALUES (?, ?)`,
      [game.name_of_the_game, game.genre]
    );
    return {
      success: true,
      game,
    };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

const updateGameQuerry = async (game: Game, id: string) => {
  try {
    await dbConfig.manager.query(
      `UPDATE GAMES SET name_of_the_game = ?, genre = ? WHERE id = ?`,
      [game.name_of_the_game, game.genre, id]
    );
    return { success: true, game };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

const deleteGameQuerry = async (id: string) => {
  try {
    await dbConfig.manager.query(`DELETE FROM GAMES WHERE id = ?`, [id]);
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

const getImagesForGame = async (id: string) => {
  const result = await dbConfig.manager.query(
    "SELECT image FROM GAMES WHERE id = ?",
    [id]
  );
  return result;
};



const addImageForGame = async (id: string, image: string) => {
  const result = await dbConfig.manager.query(
    `UPDATE GAMES SET image = ? WHERE id = ?`,
    [image, id]
  );
  return result;
};



export default {
  getAllGamesQuerry,
  getGameByIdQuerry,
  insertGameQuerry,
  deleteGameQuerry,
  updateGameQuerry,
  getImagesForGame,
  addImageForGame
};
