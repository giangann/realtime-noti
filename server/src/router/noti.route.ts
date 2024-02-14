import express from "express";
import { isOurUser } from "auth.middleware";
import notiController from "noti.controller";

const notiRoute = express.Router();
notiRoute.get("/", isOurUser, notiController.listMyNoti);

export { notiRoute };
