import { AppDataSource } from "../data-source";
import { Aluno } from "../entities/alunos";

export class AlunoService {
  private repository = AppDataSource.getRepository(Aluno);

  async create(data: Partial<Aluno>) {
    const matriculaExiste = await this.repository.findOne({
      where: {
        matricula: data.matricula,
      },
    });

    if (matriculaExiste) {
      throw new Error("Já existe um aluno com essa matrícula");
    }

    const aluno = this.repository.create(data);

    return await this.repository.save(aluno);
  }

  async findAll() {
    return await this.repository.find({
      relations: ["turma", "responsavel"],
    });
  }

  async findById(id: number) {
    const aluno = await this.repository.findOne({
      where: { id },
      relations: ["turma", "responsavel"],
    });

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }
    return aluno;
  }
  async update(id: number, data: Partial<Aluno>) {
    const aluno = await this.repository.findOne({ id });

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }
    // Atualiza os dados do aluno encontrado com os novos dados recebidos
    this.repository.merge(aluno, data);
    //Salva as alterações no banco de dados
    return await this.repository.save({ id });
  }
  async delete(id: number) {
    const aluno = await this.repository.findOneBy({ id });

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }
    await this.repository.remove(aluno);
  }
}
