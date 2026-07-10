import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntityAtivo } from "./baseEntityAtivo";
import type { Aluno } from "./aluno";

@Entity("responsaveis")
export class Responsavel extends BaseEntityAtivo {
  @Column({ type: "varchar" })
  private _nome: string;

  @Column({ type: "varchar", unique: true })
  private _cpf: string;

  @Column({ type: "varchar", unique: true })
  private _email: string;

  @OneToMany("Aluno", "responsavel")
  alunos: Aluno[];

  get nome(): string {
    return this._nome;
  }

  set nome(valor: string) {
    if (!valor || valor.trim().length < 3) {
      throw new Error("O nome deve ter pelo menos 3 caracteres.");
    }
    this._nome = valor.trim();
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(valor: string) {
    const cpfLimpo = valor.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      throw new Error("CPF deve conter exatamente 11 dígitos.");
    }
    this._cpf = cpfLimpo;
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

  quantidadeFilhos(): number {
    return this.alunos ? this.alunos.length : 0;
  }
}
