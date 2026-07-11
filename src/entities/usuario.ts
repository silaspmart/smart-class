import { Entity, Column } from "typeorm";
import { BaseEntityAtivo } from "./baseEntityAtivo";

export enum TipoUsuario {
  FUNCIONARIO = "FUNCIONARIO",
  ALUNO = "ALUNO",
  RESPONSAVEL = "RESPONSAVEL",
}

@Entity("usuarios")
<<<<<<< HEAD
export class Usuario extends BaseEntityAtivo {
  @Column({ type: "varchar" })
  private _nome: string;

  @Column({ type: "varchar", unique: true })
  private _email: string;

  @Column({ type: "varchar" })
  private _senha: string;

  @Column({ type: "enum", enum: TipoUsuario })
  _perfil: TipoUsuario;
=======
export abstract class Usuario extends BaseEntityAtivo {
  @Column()
  protected _nome: string;

  @Column({ unique: true })
  protected _email: string;

  @Column()
  protected _senha: string;

  @Column({ type: "enum", enum: TipoUsuario })
  protected _perfil: TipoUsuario;
>>>>>>> eefad2cb5e7c8b29d094a464cbcca4cba853b650

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

  // --- Método abstrato (cada subclasse deve implementar) ---
  abstract descreverPermissoes(): string[];

  // --- Método concreto com polimorfismo ---
  temPermissao(acao: string): boolean {
    const permissoes = this.descreverPermissoes();
    return permissoes.includes(acao);
  }
}
