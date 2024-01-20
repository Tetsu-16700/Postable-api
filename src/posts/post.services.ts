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

  async editPost(token: string, data: any, postId: string) {
    try {
      const res_validate = await authService.validateToken(token);
      if (!res_validate.response.ok) return res_validate;
      // validado si existe
      const res_find = await this.findPost(postId);
      if (!res_find.response.ok) return res_find;
      // validar si el post le pertenece o no
      if (res_validate.response.data.id !== res_find.response.data.userid)
        return responseHTTP.http401("No authorization");
      // procedemos a modificar
      const response = await postQuery.editPost(data.content, postId);
      const likes = await postQuery.findLikes(postId);
      const { userId, ...restData } = response;

      const formatData = {
        restData,
        username: res_validate.response.data.username,
        likesCount: likes,
      };
      return responseHTTP.http200("Post edited", formatData);
    } catch (error) {
      return responseHTTP.http500(undefined, error);
    }
  }

  // buscar like

  async findPost(postId: string) {
    try {
      const res_find = await postQuery.findPost(postId);
      if (!res_find) return responseHTTP.http400("Post not found");
      return responseHTTP.http200(undefined, res_find);
    } catch (error) {
      return responseHTTP.http500(undefined, error);
    }
  }

  // darle like
  async postLike(token: string, postId: string) {
    try {
      const res_validate = await authService.validateToken(token);
      if (!res_validate.response.ok) return res_validate;

      const res_find = await this.findPost(postId);
      if (!res_find.response.ok) return res_find;

      await postQuery.setLike(postId, res_validate.response.data.id);

      const likes = await postQuery.findLikes(postId);
      console.log(likes);

      const { userId, ...restData } = res_find.response.data;

      const format = {
        restData,
        username: res_validate.response.data.username,
        likesCount: likes,
      };

      return responseHTTP.http200("Set like", format);
    } catch (error) {
      return responseHTTP.http500(undefined, error); // gracias 💖
    }
  }

  // quitar el like
  async postDisLike(token: string, postId: string) {
    try {
      const res_validate = await authService.validateToken(token);
      if (!res_validate.response.ok) return res_validate;

      const res_find = await this.findPost(postId);
      if (!res_find.response.ok) return res_find;

      await postQuery.removeLike(postId, res_validate.response.data.id);

      const likes = await postQuery.findLikes(postId);

      const { userId, ...restData } = res_find.response.data;

      const format = {
        restData,
        username: res_validate.response.data.username,
        likesCount: likes,
      };

      return responseHTTP.http200("Set like", format);
    } catch (error) {
      return responseHTTP.http500(undefined, error);
    }
  }
}

export const postService = new PostService();
