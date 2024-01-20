import { createPostDTO } from "../posts/dto/create-post.dto";
import { NextFunction, Request, Response } from "express";

class PostMiddleware {
  // POST /posts (Crear Nuevo Post)
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      createPostDTO.parse(req.body);
      next();
    } catch (error) {
      console.log(error);
    }
  }
}

export const postMiddleware = new PostMiddleware();
