import { Request, Response } from "express";
import { INotiCreate } from "noti.interface";
import notiService from "../services/noti.service";
import { IUserRecord } from "user.interface";
import userService from "../services/user.service";
import { ServerResponse } from "../ultils/server-response.ultil";
import { Sanitize } from "../ultils/sanitize.ultil";

const create = async (req: Request, res: Response) => {
  const noti: INotiCreate = req.body;

  const notiCreated = await notiService.create({ ...noti });

  if (notiCreated) return res.status(200).json(notiCreated);
  else return res.status(400).json({ error: { message: "server err" } });
};

const listMyNoti = async (
  req: Request & { user?: IUserRecord },
  res: Response
) => {
  try {
    if (req.user) {
      const listNoti = await notiService.list({ to_user_id: req.user.id });
      console.log("list noti", listNoti);
      const notiPromise = await Promise.all(
        listNoti.map(async (noti) => {
          const fromUser = await userService.detail({ id: noti.from_user_id });
          return {
            ...noti,
            from_user: Sanitize.user(fromUser),
          };
        })
      );
      console.log(notiPromise);

      return ServerResponse.response(res, notiPromise);
    }
  } catch (e) {
    return res.status(400).json({ error: { message: "server err" } });
  }
};

export default { listMyNoti, create };
