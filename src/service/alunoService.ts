import { AppDataSource } from "../data-source";
import { Aluno } from "../entities/aluno";

export class AlunoService {
  private repository = AppDataSource.getRepository(Aluno);

  async create(data: Partial<Aluno>) {
    const aluno = this.repository.create(data);
    return await this.repository.save(aluno);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    const aluno = await this.repository.findOne({
      where: { id },
    });

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }
    return aluno;
  }

  async update(id: number, data: Partial<Aluno>) {
    const aluno = await this.findById(id);

    this.repository.merge(aluno, data);
    return await this.repository.save(aluno);
  }

  async delete(id: number) {
    const aluno = await this.findById(id);
    await this.repository.remove(aluno);
  }
}
