import { query } from "../db/conecction";

class PostQuery {
  private readonly table_post = "Posts";
  private readonly table_like = "Likes";

  async findPost(postId: string) {
    const sql = `select*from ${this.table_post} where id=$1`;
    const response = await query(sql, [postId]);
    return response.rows[0];
  }

  // POST /posts (Crear Nuevo Post)
  async createPost(data: { userId: string; content: string }) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const sql = `insert into ${this.table_post}(userId, content, createdAt, updatedAt) values($1, $2, $3, $4) returning*`;
    const response = await query(sql, [
      data.userId,
      data.content,
      formattedDate,
      formattedDate,
    ]);
    return response.rows[0];
  }

  async editPost(content: string, postId: string) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const sql = `update ${this.table_post} set content=$1,updatedAt=$2 where id=$3 returning*`;
    const response = await query(sql, [content, formattedDate, postId]);
    return response.rows[0];
  }

  //   busca likes
  async findLikes(postId: string) {
    const sql = `select * from ${this.table_like} where postId=$1`;
    const response = await query(sql, [postId]);
    return response.rowCount;
  }

  //   crear un like
  async setLike(postId: string, userId: string) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const sql = `insert into ${this.table_like}(postId, userId, createdAt) values($1, $2, $3) `;
    await query(sql, [postId, userId, formattedDate]);
  }

  //   quitar el linke
  async removeLike(postId: string, userId: string) {
    const sql = `delete from ${this.table_like} where postId=$1 and userId=$2`;
    await query(sql, [postId, userId]);
  }

  // get posts
  async getPostsClean(userId?: string) {
    if (userId) {
      const sql = `select*from ${this.table_post} where userId=$1`;
      const response = await query(sql, [userId]);
      return response.rows;
    } else {
      const sql = `select*from ${this.table_post} `;
      const response = await query(sql);
      return response.rows;
    }
  }

  async getPosts(rest_sql: string) {
    const sql = `select*from ${this.table_post} ${rest_sql}`;
    const response = await query(sql);
    return response.rows;
  }
}

export const postQuery = new PostQuery();
