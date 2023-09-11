"use strict";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import { AppDataSource } from "./data-source";
dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "localhost";

AppDataSource.initialize()
  .then(() => {
    console.log("database initialized!");
  })
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(express.static("upload"));
app.use("/", router);

// Handle invalid routes or API endpoints
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Invalid API endpoint or route" });
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
