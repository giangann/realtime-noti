import express from "express";
import { authRoute } from "./auth.route";
import { notiRoute } from "./noti.route";

const indexRoute = express.Router();

indexRoute.use("/noti", notiRoute);
indexRoute.post("/auth", authRoute);

export { indexRoute };
