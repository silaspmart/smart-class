import { AppDataSource } from "../data-source";
import { Responsavel } from "../entities/responsavel";

export class ResponsavelService {
  private repository = AppDataSource.getRepository(Responsavel);

  async create(data: Partial<Responsavel>) {
    const responsavel = this.repository.create(data);
    return await this.repository.save(responsavel);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    const responsavel = await this.repository.findOne({
      where: { id },
    });

    if (!responsavel) {
      throw new Error("Responsável não encontrado");
    }
    return responsavel;
  }

  async update(id: number, data: Partial<Responsavel>) {
    const responsavel = await this.findById(id);

    this.repository.merge(responsavel, data);
    return await this.repository.save(responsavel);
  }

  async delete(id: number) {
    const responsavel = await this.findById(id);
    await this.repository.remove(responsavel);
  }
}
