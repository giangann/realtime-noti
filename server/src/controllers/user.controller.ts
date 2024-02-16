import { Request, Response } from "express";
import userService from "../services/user.service";
import { ServerResponse } from "../ultils/server-response.ultil";

const list = async (req: Request, res: Response) => {
  try {
    const listUser = await userService.list({ isAdmin: false });
    ServerResponse.response(res, listUser);
  } catch (e) {
    return ServerResponse.error(res, e.message);
  }
};

export default { list };
