import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";

export const isOurUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.headers.cookie;

  const userId = cookie.split("=")[1];

  console.log("our cookie", cookie, userId);

  const foundUser = await userService.detail({ id: userId });
  if (!foundUser)
    return res.status(400).json({ error: { message: "UnAuthorized" } });

  // @ts-ignore
  req.user = foundUser;
  next();
};
