import express from "express";
import { isOurUser } from "../middlewares/auth.middleware";
import notiController from "../controllers/noti.controller";

const notiRoute = express.Router();
notiRoute.get("/", isOurUser, notiController.listMyNoti);
notiRoute.post("/", notiController.create);
export { notiRoute };
