import { Request, Response } from "express";
import { RegistroEntradaSaidaService } from "../service/registroEntradaSaidaService";

export class RegistroEntradaSaidaController {
  private service = new RegistroEntradaSaidaService();

  async create(req: Request, res: Response) {
    try {
      const registro = await this.service.create(req.body);
      return res.status(201).json(registro);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao criar registro" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const registros = await this.service.findAll();
      return res.status(200).json(registros);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao buscar registros" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const registro = await this.service.findById(Number(req.params.id));
      return res.status(200).json(registro);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao buscar registro" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const registro = await this.service.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(registro);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao atualizar registro" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.delete(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(404).json({ message: "Erro ao deletar registro" });
    }
  }
}
