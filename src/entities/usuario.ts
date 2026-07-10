import { Entity, Column } from "typeorm";
import { BaseEntityAtivo } from "./baseEntityAtivo";

export enum TipoUsuario {
  FUNCIONARIO = "FUNCIONARIO",
  ALUNO = "ALUNO",
  RESPONSAVEL = "RESPONSAVEL",
}

@Entity("usuarios")
export class Usuario extends BaseEntityAtivo {
  @Column({ type: "varchar" })
  private _nome: string;

  @Column({ type: "varchar", unique: true })
  private _email: string;

  @Column({ type: "varchar" })
  private _senha: string;

  @Column({ type: "enum", enum: TipoUsuario })
  private _perfil: TipoUsuario;

  @Column({ type: "timestamp", nullable: true })
  ultimoLogin: Date;

  // --- Encapsulamento ---
  get nome(): string {
    return this._nome;
  }

  set nome(valor: string) {
    if (!valor || valor.trim().length < 3) {
      throw new Error("O nome deve ter pelo menos 3 caracteres.");
    }
    this._nome = valor.trim();
  }

  get email(): string {
    return this._email;
  }

  set email(valor: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valor)) {
      throw new Error("E-mail inválido.");
    }
    this._email = valor.toLowerCase().trim();
  }

  get perfil(): TipoUsuario {
    return this._perfil;
  }

  set perfil(valor: TipoUsuario) {
    if (!Object.values(TipoUsuario).includes(valor)) {
      throw new Error("Tipo de usuário inválido.");
    }
    this._perfil = valor;
  }

  // --- Métodos de Domínio ---
  registrarLogin(): void {
    this.ultimoLogin = new Date();
  }

  trocarSenha(senhaAntiga: string, novaSenha: string): void {
    if (this._senha !== senhaAntiga) {
      throw new Error("Senha antiga incorreta.");
    }
    if (novaSenha.length < 6) {
      throw new Error("A nova senha deve ter pelo menos 6 caracteres.");
    }
    this._senha = novaSenha;
  }

  isFuncionario(): boolean {
    return this._perfil === TipoUsuario.FUNCIONARIO;
  }
}
