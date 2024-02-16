import express from "express";
import authRoute from "./auth.route";
import { notiRoute } from "./noti.route";
import userRoute from "./user.route";

const indexRoute = express.Router();

indexRoute.use("/noti", notiRoute);
indexRoute.use("/auth", authRoute);
indexRoute.use("/user", userRoute);

export default indexRoute;
