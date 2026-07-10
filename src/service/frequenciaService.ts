import { AppDataSource } from "../data-source";
import { Frequencia } from "../entities/frequencia";

export class FrequenciaService {
  private repository = AppDataSource.getRepository(Frequencia);

  async create(data: Partial<Frequencia>) {
    const frequencia = this.repository.create(data);
    return await this.repository.save(frequencia);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    const frequencia = await this.repository.findOne({
      where: { id },
    });

    if (!frequencia) {
      throw new Error("Frequência não encontrada");
    }
    return frequencia;
  }

  async update(id: number, data: Partial<Frequencia>) {
    const frequencia = await this.findById(id);

    this.repository.merge(frequencia, data);
    return await this.repository.save(frequencia);
  }

  async delete(id: number) {
    const frequencia = await this.findById(id);
    await this.repository.remove(frequencia);
  }
}
