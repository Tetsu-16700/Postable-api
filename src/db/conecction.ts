import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postable",
  user: "postgres",
  password: "12345678",
});

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};


