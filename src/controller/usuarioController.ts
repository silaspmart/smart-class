import { Request, Response } from "express";
import { UsuarioService } from "../service/usuarioService";

export class UsuarioController {
  private service = new UsuarioService();

  async create(req: Request, res: Response) {
    try {
      const usuario = await this.service.create(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({
        erro: (error as Error).message,
      });
    }
  }

  async list(req: Request, res: Response) {
    const usuarios = await this.service.list();
    return res.json(usuarios);
  }
  async listId(req: Request, res: Response) {
    try {
      const usuario = await this.service.listId(Number(req.params.id));
      return res.json(usuario);
    } catch (error) {
      return res.status(404).json({
        erro: (error as Error).message,
      });
    }
  }
  async listActive(req: Request, res: Response) {
    const usuarios = await this.service.listActive();
    return res.status(200).json(usuarios);
  }

  async atualizar(req: Request, res: Response) {
    try {
      const usuario = await this.service.update(
        Number(req.params.id),
        req.body
      );
      return res.json(usuario);
    } catch (error) {
      return res.status(400).json({
        erro: (error as Error).message,
      });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const resultado = await this.service.delete(Number(req.params.id));
      return res.json(resultado);
    } catch (error) {
      return res.status(400).json({
        erro: (error as Error).message,
      });
    }
  }
}
