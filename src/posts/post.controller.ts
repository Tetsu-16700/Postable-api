import { Request, Response } from "express";
import { postService } from "./post.services";
import { responseHTTP } from "../model/response";

class PostController {
  // POST /posts (Crear Nuevo Post)
  async create(req: Request, res: Response) {
    const token = req.get("Authotization");
    const data = req.body;
    if (token) {
      const response = await postService.createPost(token, data);
      res.status(response.code).json(response.response);
    } else {
      const error = responseHTTP.http401("Error de autorizacion");
      res.status(error.code).json(error.response);
    }
  }

}

export const postController = new PostController();
