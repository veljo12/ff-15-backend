import express from "express";
import clientsController from "../conrollers/clients-controller";



const clientRouter = express.Router();

clientRouter.route("")
                .get(clientsController.getAllClients)
                .post(clientsController.insertClient);


clientRouter.route("/:id")
                .get(clientsController.getClientById)
                .put(clientsController.updateClient)
                .delete(clientsController.deleteClient);
                

export default clientRouter;
