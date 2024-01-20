import express from "express";
import { postMiddleware } from "./post.middleware";
import { postController } from "./post.controller";

const postRouter = express.Router();

const prefix = "/posts";

postRouter.post(`${prefix}`, postMiddleware.create, postController.create);

export default postRouter;
