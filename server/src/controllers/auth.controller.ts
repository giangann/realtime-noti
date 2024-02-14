import { Request, Response } from "express";
import authService from "auth.service";
import { IUserRecord } from "user.interface";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const data = await authService.login({ username, password });

  if (data.data)
    return res.status(200).json(data.data).cookie("user", data.data.id);
  else res.status(400).json(data.error);
};

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const data = await authService.register({ username, password });

  return res.status(200).json(data);
};

const me = async (req: Request & { user: IUserRecord }, res: Response) => {
  const me = req.user;

  return res.status(200).json(me);
};

export default { login, register, me };
