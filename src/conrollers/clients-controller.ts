import { Request, Response } from "express";
import clientsRepositories from "../repositories/clients-repositories";


const getAllClients = async (req: Request, res: Response) => {
    const users = await clientsRepositories.getAllClientsQuerry();
    res.send(users);
};

const getClientById = async (req: Request, res: Response) => {
    const getUserById = await clientsRepositories.getClientByIdQuerry(req.params.id);
    res.send(getUserById);
};

const insertClient = async (req: Request, res: Response) => { 
    const insertUser = await clientsRepositories.insertClientQuerry(req.body);
    res.send(insertUser);
};

const updateClient = async (req: Request, res: Response) => {
    const updateGame = await clientsRepositories.updateClientQuerry(req.body, req.params.id)
    res.send(updateGame);
  };
  
const deleteClient = async (req: Request, res: Response) => {
    const deleteGame = await clientsRepositories.deleteClientQuerry(req.params.id);
    res.send(deleteGame);
  };



export default{
    getAllClients,
    getClientById,
    insertClient,
    updateClient,
    deleteClient
}