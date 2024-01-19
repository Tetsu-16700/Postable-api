import express from "express";
import { authMiddleware } from "./auth.middleware";
import { authController } from "./auth.controler";

const authRouter = express.Router();

const prefix = "/auth";

authRouter.post(
  `${prefix}/signup`,
  authMiddleware.signup,
  authController.signup
);

authRouter.post(`${prefix}/login`, authMiddleware.login, authController.login);
authRouter.get(`${prefix}/me`);
authRouter.patch(`${prefix}/me`);
authRouter.delete(`${prefix}/me`);

export default authRouter;
