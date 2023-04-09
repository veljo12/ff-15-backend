import { Request, Response } from "express";
import userRepositories from "../repositories/user-repositories";


const getAllUsers = async (req: Request, res: Response) => {
    const users = await userRepositories.getAllUsersQuerry();
    res.send(users);
};

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const getUserResult = await userRepositories.getUserByIdQuerry(id);
    const getUserById = getUserResult[0];
    res.send(getUserById);
};


const login = async (req: Request, res: Response) => {
    const result = await userRepositories.login(req.body);
    res.send(result);
};

const register = async (req: Request, res: Response) => {
    const result = await userRepositories.register(req.body);
    res.send(result);
};

const addImageForUser = async (req: Request, res: Response) => {
  console.log('addImageForUser called with body:', req.body);
    const addImageForUser = await userRepositories.addImageForUser(
      req.body.id,
      req.body.image
    );
    res.send(addImageForUser);
  };
  
  const addCoverForUser = async (req: Request, res: Response) => {
    const addCoverForUser = await userRepositories.addCoverForUser(
      req.body.id,
      req.body.cover
    );
    res.send(addCoverForUser);
  };
  


export default{login, register, getAllUsers, getUserById, addImageForUser, addCoverForUser}