import { Request, Response } from "express";
import { AlunoService } from "../service/alunoService";

export class AlunoController {
  private service = new AlunoService();

  async create(req: Request, res: Response) {
    try {
      const aluno = await this.service.create(req.body);

      return res.status(201).json(aluno);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  //Busca todos os Registros
  async findAll(req: Request, res: Response) {
    try {
      const alunos = await this.service.findAll();
      return res.status(200).json(alunos);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  //Busca um registro especifico

  async findById(req: Request, res: Response) {
    try {
      const aluno = await this.service.findById(Number(req.params.id));
      return res.status(200).json(aluno);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const aluno = await this.service.update(Number(req.params.id), req.body);
      return res.status(200).json(aluno);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.delete(Number(req.params.id));

      //Retorna sucesso na exclusão sem enviar o conteúdo da resposta
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}
