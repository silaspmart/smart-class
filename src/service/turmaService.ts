import { AppDataSource } from "../data-source";
import { Turma } from "../entities/turma";

export class TurmaService {
  private repository = AppDataSource.getRepository(Turma);

  async create(data: Partial<Turma>) {
    const turmaExiste = await this.repository.findOne({
      where: { nome: data.nome },
    });

    if (turmaExiste) {
      throw new Error("Já existe uma turma com esse nome");
    }

    const turma = this.repository.create(data);
    return await this.repository.save(turma);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    const turma = await this.repository.findOne({
      where: { id },
    });

    if (!turma) {
      throw new Error("Turma não encontrada");
    }
    return turma;
  }

  async update(id: number, data: Partial<Turma>) {
    const turma = await this.repository.findOne({ where: { id } });

    if (!turma) {
      throw new Error("Turma não encontrada");
    }

    this.repository.merge(turma, data);
    return await this.repository.save(turma);
  }

  async delete(id: number) {
    const turma = await this.repository.findOneBy({ id });

    if (!turma) {
      throw new Error("Turma não encontrada");
    }
    await this.repository.remove(turma);
  }
}
