import { query } from "../db/conecction";
import { IFieldsAuth } from "./models/auth.interfaces";

class AuthQuery {
  // para que sea privad ala contraseña
  private readonly table_user = "Users";

  async findUser(username: string) {
    const sql = `select*from ${this.table_user} where username = $1`;
    const response = await query(sql, [username]);
    return response.rows[0];
  }

  async createUser(data: IFieldsAuth): Promise<any> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const sql = `insert into ${this.table_user}(username, password, createdAt, updatedAt) values($1,$2,$3,$4) returning*`;
    const response = await query(sql, [
      data.username,
      data.password,
      formattedDate,
      formattedDate,
    ]);
    return response.rows[0];
  }
}

export const authQuery = new AuthQuery();
