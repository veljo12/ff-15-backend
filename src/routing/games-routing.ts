import express from "express";
import gamesController from "../conrollers/games-controller";
import authMiddleware from "../middleware/auth-middleware";

const gamesRouter = express.Router();

gamesRouter
  .route("")
  .get(authMiddleware ,gamesController.getAllGames)
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
  

// gamesRouter.get("", gamesController.getAllGames);
// gamesRouter.post("", gamesController.insertGame);

// gamesRouter.get("/:id", gamesController.getGameById);
// gamesRouter.put("/:id", gamesController.updateGame);
// gamesRouter.delete("/:id", gamesController.deleteGame);

export default gamesRouter;
