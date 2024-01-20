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

  // editar post
  async edit(req: Request, res: Response) {
    const token = req.get("Authorization");
    const data = req.body;
    const id = req.params["id"];
    if (token) {
      const response = await postService.editPost(token, data, id);
      res.status(response.code).json(response.response);
    } else {
      const error = responseHTTP.http401("Error authorization");
      res.status(error.code).json(error.response);
    }
  }

  // darle like
  async like(req: Request, res: Response) {
    const id = req.params["postId"];
    const token = req.get("Authorization");
    if (token) {
      const response = await postService.postLike(token, id);
      res.status(response.code).json(response.response);
    } else {
      const error = responseHTTP.http401("Error authorization");
      res.status(error.code).json(error.response);
    }
  }

  // quitar like
  async dislike(req: Request, res: Response) {
    const id = req.params["postId"];
    const token = req.get("Authorization");
    if (token) {
      const response = await postService.postDisLike(token, id);
      res.status(response.code).json(response.response);
    } else {
      const error = responseHTTP.http401("Error authorization");
      res.status(error.code).json(error.response);
    }
  }
}

export const postController = new PostController();
