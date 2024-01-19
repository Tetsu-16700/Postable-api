import { query } from "../db/conecction";
import { IEditMe, IFieldsAuth } from "./models/auth.interfaces";

class AuthQuery {
  // para que sea privad ala contraseña
  private readonly table_user = "Users";

  async findUser(username: string) {
    const sql = `select*from ${this.table_user} where username = $1`;
    const response = await query(sql, [username]);
    return response.rows[0];
  }

  async findUserById(id: string) {
    const sql = `select*from ${this.table_user} where id = $1`;
    const response = await query(sql, [id]);
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

  async editUser(data: IEditMe, id: string) {
    const fields = Object.keys(data)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = Object.values(data);
    const sql = `update ${this.table_user} set ${fields} where id = ${id} returning*;`;
    const response = await query(sql, values);
    return response.rows[0];
  }

  async deleteUser(id: string) {
    const sql = `delete from ${this.table_user} where id = $1`;
    await query(sql, [id]);
  }
}

export const authQuery = new AuthQuery();
