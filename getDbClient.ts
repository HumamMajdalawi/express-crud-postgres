import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

export const getDbClient = (): Client => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ""),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  return client;
};
