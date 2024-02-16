import { Request, Response } from "express";
import authService from "../services/auth.service";
import { IUserRecord } from "user.interface";
import { ServerResponse } from "../ultils/server-response.ultil";

const login = async (req: Request, res: Response) => {
  if (!req.body) {
    return ServerResponse.error(
      res,
      "Bad Request: Your request don't have body property"
    );
  }
  try {
    const { username, password } = req?.body;
    const userData = await authService.login({ username, password });

    if (!userData) {
      return ServerResponse.error(res, "No user found");
    } else {
      if (userData.password !== password)
        return ServerResponse.error(res, "Wrong password");
      let cookie = { key: "user", value: userData.id };
      return ServerResponse.response(res, userData, 200, cookie);
    }
  } catch (e) {
    return ServerResponse.error(res, e.message);
  }
};
const logout = async (req: Request, res: Response) => {
  try {
    return res.clearCookie("user").status(200).json({ success: true });
  } catch (e) {
    return ServerResponse.error(e, e?.message || "Backend Err");
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userData = await authService.register({ username, password });
    const newCookie = { key: "user", value: userData.id };
    return ServerResponse.response(res, userData, 201, newCookie);
  } catch (e) {
    return ServerResponse.error(res, e.message);
  }
};

const me = async (req: Request & { user: IUserRecord }, res: Response) => {
  try {
    const me = req.user;
    return ServerResponse.response(res, me);
  } catch (e) {
    return ServerResponse.error(res, e.message);
  }
};

export default { login, logout, register, me };
