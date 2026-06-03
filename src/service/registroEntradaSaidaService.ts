import { AppDataSource } from "../data-source";
import { RegistroEntradaSaida } from "../entities/registroEntradaSaida";

export class RegistroEntradaSaidaService {
  private repository = AppDataSource.getRepository(RegistroEntradaSaida);

  async create(data: Partial<RegistroEntradaSaida>) {
    const registro = this.repository.create(data);
    return await this.repository.save(registro);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    const registro = await this.repository.findOne({
      where: { id },
    });

    if (!registro) {
      throw new Error("Registro não encontrado");
    }
    return registro;
  }

  async update(id: number, data: Partial<RegistroEntradaSaida>) {
    const registro = await this.findById(id);

    this.repository.merge(registro, data);
    return await this.repository.save(registro);
  }

  async delete(id: number) {
    const registro = await this.findById(id);
    await this.repository.remove(registro);
  }
}
