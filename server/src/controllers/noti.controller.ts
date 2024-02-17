import { Request, Response } from "express";
import { INotiCreate } from "noti.interface";
import notiService from "../services/noti.service";
import { IUserRecord } from "user.interface";
import userService from "../services/user.service";
import { ServerResponse } from "../ultils/server-response.ultil";
import { Sanitize } from "../ultils/sanitize.ultil";
import { wsServerGlob } from "../index";
import notiWebsocket from "../websockets/noti.websocket";

const create = async (req: Request, res: Response) => {
  try {
    const noti: INotiCreate = req.body;
    const notiCreated = await notiService.create({ ...noti });

    await notiWebsocket.sendNotiToUser(
      notiCreated.to_user_id,
      "this is noti from controller"
    );
    return ServerResponse.response(res, notiCreated);
  } catch (e) {
    return ServerResponse.error(res, e.name || "Server err");
  }
};

const listMyNoti = async (
  req: Request & { user?: IUserRecord },
  res: Response
) => {
  try {
    if (req.user) {
      console.log(wsServerGlob);
      const listNoti = await notiService.list({ to_user_id: req.user.id });
      const notiPromise = await Promise.all(
        listNoti.map(async (noti) => {
          const fromUser = await userService.detail({ id: noti.from_user_id });
          return {
            ...noti,
            from_user: Sanitize.user(fromUser),
          };
        })
      );
      return ServerResponse.response(res, notiPromise);
    }
  } catch (e) {
    return ServerResponse.error(res, e.message || "Server err");
  }
};

export default { listMyNoti, create };
