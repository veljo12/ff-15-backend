import "reflect-metadata";

import express from "express";
import gamesRouter from "../src/routing/games-routing";
import clientRouter from "./routing/client-routing";

import dbConfig from "./common/db-config";
import cors from 'cors';
import path from "path";


const app = express();
app.use(express.json());

const pathName = path.join(__dirname, '..', 'public', 'uploads');
app.use(express.static(pathName));

app.use(cors());

app.use("/games", gamesRouter);
app.use("/clients", clientRouter);

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
