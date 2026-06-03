import { Request, Response } from "express";
import { TurmaService } from "../service/turmaService";

export class TurmaController {
  private service = new TurmaService();

  async create(req: Request, res: Response) {
    try {
      const turma = await this.service.create(req.body);
      return res.status(201).json(turma);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao criar turma" });
    }
  }

  // Busca todos os Registros
  async findAll(req: Request, res: Response) {
    try {
      const turmas = await this.service.findAll();
      return res.status(200).json(turmas);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao buscar turmas" });
    }
  }

  // Busca um registro especifico
  async findById(req: Request, res: Response) {
    try {
      const turma = await this.service.findById(Number(req.params.id));
      return res.status(200).json(turma);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao buscar turma" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const turma = await this.service.update(Number(req.params.id), req.body);
      return res.status(200).json(turma);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao atualizar turma" });
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
      return res.status(404).json({ message: "Erro ao deletar turma" });
    }
  }
}
