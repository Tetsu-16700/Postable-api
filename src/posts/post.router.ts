import express from "express";
import { postMiddleware } from "./post.middleware";
import { postController } from "./post.controller";

const postRouter = express.Router();

const prefix = "/posts";

postRouter.post(`${prefix}`, postMiddleware.create, postController.create);
postRouter.patch(`${prefix}/:id`, postMiddleware.edit, postController.edit);
postRouter.post(`${prefix}/:postId/like`, postController.like);
postRouter.delete(`${prefix}/:postId/like`, postController.dislike);

export default postRouter;
