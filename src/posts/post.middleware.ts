import { createPostDTO } from "../posts/dto/create-post.dto";
import { NextFunction, Request, Response } from "express";
import { editPostDTO } from "./dto/edit-post.dto";

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

  // editar post
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      editPostDTO.parse(req.body);
      next();
    } catch (error) {
      console.log(error);
    }
  }
}

export const postMiddleware = new PostMiddleware();
