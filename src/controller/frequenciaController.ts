import { Request, Response } from "express";
import { FrequenciaService } from "../service/frequenciaService";

export class FrequenciaController {
  private service = new FrequenciaService();

  async create(req: Request, res: Response) {
    try {
      const frequencia = await this.service.create(req.body);
      return res.status(201).json(frequencia);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao criar frequência" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const frequencias = await this.service.findAll();
      return res.status(200).json(frequencias);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao buscar frequências" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const frequencia = await this.service.findById(Number(req.params.id));
      return res.status(200).json(frequencia);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao buscar frequência" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const frequencia = await this.service.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(frequencia);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Erro ao atualizar frequência" });
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
      return res.status(404).json({ message: "Erro ao deletar frequência" });
    }
  }
}
