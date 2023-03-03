import { Request, Response } from "express";
import gamesRepositories from "../repositories/games-repositories";

const getAllGames = async (req: Request, res: Response) => {
  const games = await gamesRepositories.getAllGamesQuerry();
  res.send(games);
};

const getGameById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const getGameResult = await gamesRepositories.getGameByIdQuerry(id);
  const getGameById = getGameResult[0];
  res.send(getGameById);
};

const insertGame = async (req: Request, res: Response) => {
  const insertGame = await gamesRepositories.insertGameQuerry(req.body);
  res.send(insertGame);
};

const updateGame = async (req: Request, res: Response) => {
  const updateGame = await gamesRepositories.updateGameQuerry(
    req.body,
    req.params.id
  );
  res.send(updateGame);
};

const deleteGame = async (req: Request, res: Response) => {
  const deleteGame = await gamesRepositories.deleteGameQuerry(req.params.id);
  res.send(deleteGame);
};

const getImagesForGame = async (req: Request, res: Response) => {
  const getImagesForGame = await gamesRepositories.getImagesForGame(
    req.params.id
  );
  res.send(getImagesForGame);
};

const addImageForGame = async (req: Request, res: Response) => {
  const addImageForGame = await gamesRepositories.addImageForGame(
    req.body.id,
    req.body.image
  );
  res.send(addImageForGame);
};


export default {
  getAllGames,
  getGameById,
  insertGame,
  updateGame,
  deleteGame,
  getImagesForGame,
  addImageForGame,
};
