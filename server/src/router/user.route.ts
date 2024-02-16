import express from "express";
import userController from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.get("/", userController.list);

export default userRoute;
