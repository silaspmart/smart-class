import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntityAtivo } from "./baseEntityAtivo";
import { Frequencia } from "./frequencia";
import type { Turma } from "./turma";
import type { Responsavel } from "./responsavel";

@Entity("alunos")
export class Aluno extends BaseEntityAtivo {
  @Column({ unique: true })
  private _matricula: string;

  @Column()
  private _nome: string;

  @Column({ type: "date" })
  private _dataNascimento: Date;

  @ManyToOne("Turma", "alunos")
  @JoinColumn({ name: "turma_id" })
  turma: Turma;

  @ManyToOne("Responsavel", "alunos")
  @JoinColumn({ name: "responsavel_id" })
  responsavel: Responsavel;

  @OneToMany(() => Frequencia, (frequencia) => frequencia.aluno)
  frequencias: Frequencia[];

  get matricula(): string {
    return this._matricula;
  }

  set matricula(valor: string) {
    if (!valor || valor.trim().length === 0) {
      throw new Error("A matrícula não pode ser vazia.");
    }
    this._matricula = valor.trim().toUpperCase();
  }

  get nome(): string {
    return this._nome;
  }

  set nome(valor: string) {
    if (!valor || valor.trim().length < 3) {
      throw new Error("O nome deve ter pelo menos 3 caracteres.");
    }
    this._nome = valor.trim();
  }

  get dataNascimento(): Date {
    return this._dataNascimento;
  }

  set dataNascimento(valor: Date) {
    if (!valor) throw new Error("A data de nascimento é obrigatória.");
    if (valor > new Date()) throw new Error("Data não pode ser no futuro.");
    this._dataNascimento = valor;
  }

  calcularIdade(): number {
    const hoje = new Date();
    const nascimento = new Date(this._dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  vincularTurma(turma: Turma): void {
    if (!turma.isAtivo()) {
      throw new Error("Não é possível vincular a uma turma inativa.");
    }
    this.turma = turma;
  }

  vincularResponsavel(responsavel: Responsavel): void {
    if (!responsavel.isAtivo()) {
      throw new Error("Não é possível vincular a um responsável inativo.");
    }
    this.responsavel = responsavel;
  }
}