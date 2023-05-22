import "reflect-metadata";

import express from "express";
import gamesRouter from "../src/routing/games-routing";
import clientRouter from "./routing/client-routing";
import fileUploadRouter from "./common/file-upload";
import userRouter from "./routing/user-routing";

import dbConfig from "./common/db-config";
import cors from 'cors';
import path from "path";

import chatsRouter from "./routing/chats-routing";


const app = express();
app.use(express.json());

const pathName = path.join(__dirname, '..', 'public', 'uploads');
app.use(express.static(pathName));

app.use(cors());

app.use("/games", gamesRouter);
app.use("/clients", clientRouter);
app.use("/users",userRouter);
app.use("/users/chats",chatsRouter);
app.use(fileUploadRouter);

dbConfig
  .initialize()
  .then(() => {
    console.log("Connected to Db!");
  })
  .catch((err) => {
    console.log("AW SNAP!");
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
