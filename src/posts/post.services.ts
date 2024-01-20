import { authService } from "../auth/auth.service";
import { responseHTTP } from "../model/response";
import { postQuery } from "./post.query";

class PostService {
  // POST /posts (Crear Nuevo Post)
  async createPost(token: string, data: any) {
    try {
      const res_validate = await authService.validateToken(token);
      if (!res_validate.response.ok) return res_validate;
      const post = {
        userId: res_validate.response.data.id,
        content: data.content,
      };
      const res_create = await postQuery.createPost(post);
      const format = {
        id: res_create.id,
        content: res_create.content,
        createdAt: res_create.createdat,
        updatedAt: res_create.updatedat,
        username: res_validate.response.data.username,
        likesCount: 0,
      };

      return responseHTTP.http201("Post created", format);
    } catch (error) {
      return responseHTTP.http500(undefined, error);
    }
  }
}

export const postService = new PostService();
