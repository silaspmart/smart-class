import "reflect-metadata";
import express, { type Application } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";

const app: Application = express();
app.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ? "*****" : "VAZIO",
  database: process.env.DB_DATABASE,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar no banco: ", error));
