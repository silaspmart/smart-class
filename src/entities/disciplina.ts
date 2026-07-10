import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntityAtivo } from "./baseEntityAtivo";
import { Turma } from "./turma";

@Entity("disciplinas")
export class Disciplina extends BaseEntityAtivo {
  @Column({ unique: true })
  private _nome: string;

  @ManyToMany(() => Turma, (turma) => turma.disciplinas)
  turmas: Turma[];

  get nome(): string {
    return this._nome;
  }

  set nome(valor: string) {
    if (!valor || valor.trim().length < 2) {
      throw new Error("O nome da disciplina é obrigatório.");
    }
    this._nome = valor.trim();
  }
}