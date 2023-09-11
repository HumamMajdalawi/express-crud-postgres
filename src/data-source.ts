import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  entities: ["dist/src/entities/**/*.js"],
  synchronize: true,
  logging: true,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ""),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
