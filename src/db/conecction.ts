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

// export const adminClient = new Client({
//   host: process.env["PGHOST"],
//   port: Number(process.env["PGPORT"]),
//   database: process.env["PGADMINDATABASE"],
//   user: process.env["PGUSER"],
//   password: process.env["PGPASSWORD"],
// });
