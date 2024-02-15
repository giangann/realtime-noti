import authController from "../controllers/auth.controller";
import { isOurUser } from "../middlewares/auth.middleware";
import express from "express";

const authRoute = express.Router();

authRoute.get("/me", isOurUser, authController.me);
authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);

export { authRoute };
