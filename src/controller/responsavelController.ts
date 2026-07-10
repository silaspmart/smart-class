import { Request, Response } from "express";
import { ResponsavelService } from "../service/responsavelService";

export class ResponsavelController {
  private service = new ResponsavelService();

  async create(req: Request, res: Response) {
    try {
      const responsavel = await this.service.create(req.body);

      return res.status(201).json(responsavel);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const responsaveis = await this.service.findAll();

      return res.status(200).json(responsaveis);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const responsavel = await this.service.findById(Number(req.params.id));

      return res.status(200).json(responsavel);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const responsavel = await this.service.update(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json(responsavel);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.delete(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}
