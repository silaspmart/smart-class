import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/usuario";

export class UsuarioService {
  private repository = AppDataSource.getRepository(Usuario);

  async create(dados: Partial<Usuario>) {
    const usuarioExistente = await this.repository.findOne({
      where: {
        email: dados.email,
      },
    });
    if (usuarioExistente) {
      throw new Error("E-mail já cadastrado.");
    }
    const usuario = this.repository.create(dados);
    await this.repository.save(usuario);
    return usuario;
  }

  async list() {
    return await this.repository.find();
  }
  async listId(id: number) {
    const usuario = await this.repository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  }
  async listActive() {
    return await this.repository.find({
      where: {
        ativo: true,
      },
    });
  }

  async update(id: number, dados: Partial<Usuario>) {
    const usuario = await this.listId(id);
    if (dados.nome) {
      usuario.nome = dados.nome;
    }
    if (dados.email) {
      usuario.email = dados.email;
    }
    if (dados.ativo) {
      usuario.ativo = dados.ativo;
    }
    return await this.repository.save(usuario);
  }

  async delete(id: number) {
    const usuario = await this.listId(id);
    await this.repository.remove(usuario);
    return {
      mensagem: "Usuário removido com sucesso.",
    };
  }
}
