import express from "express";
import gamesController from "../conrollers/games-controller";
import authMiddleware from "../middleware/auth-middleware";

const gamesRouter = express.Router();

gamesRouter
  .route("")
  .get(gamesController.getAllGames) //authMiddleware (dodati middleware)
  .post(gamesController.insertGame);

gamesRouter
  .route("/:id")
  .get(gamesController.getGameById)
  .put(gamesController.updateGame)
  .delete(gamesController.deleteGame);

gamesRouter.route("/images/:id").get(gamesController.getImagesForGame);

gamesRouter.route("/add-image")
  .post(gamesController.addImageForGame)

gamesRouter.route("/add-cover").post(gamesController.addCoverForGame)
  
export default gamesRouter;
