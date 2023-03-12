import { Request, Response } from "express";
import userRepositories from "../repositories/user-repositories";

const login = async (req: Request, res: Response) => {
    const result = await userRepositories.login(req.body);
    res.send(result);
};

const register = async (req: Request, res: Response) => {
    const result = await userRepositories.register(req.body);
    res.send(result);
}

export default{login, register}