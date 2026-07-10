import { Router } from "express";
import { UsuarioController } from "../controller/usuarioController";

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

usuarioRoutes.post("/", (req, res) => usuarioController.create(req, res));

usuarioRoutes.get("/", (req, res) => usuarioController.list(req, res));

usuarioRoutes.get("/ativos", (req, res) =>
  usuarioController.listActive(req, res)
);

usuarioRoutes.get("/:id", (req, res) => usuarioController.listId(req, res));

usuarioRoutes.patch("/:id", (req, res) =>
  usuarioController.update(req, res)
);

usuarioRoutes.delete("/:id", (req, res) => usuarioController.delete(req, res));

export default usuarioRoutes;
