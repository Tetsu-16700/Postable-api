import { query } from "../db/conecction";

class PostQuery {
  private readonly table_post = "Posts";
  private readonly table_like = "Likes";

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
}

export const postQuery = new PostQuery();
