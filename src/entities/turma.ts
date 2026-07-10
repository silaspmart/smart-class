import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { BaseEntityAtivo } from "./baseEntityAtivo";
import { Disciplina } from "./disciplina";
import type { Aluno } from "./aluno";

export enum Turno {
  MANHA = "MANHA",
  TARDE = "TARDE",
  NOITE = "NOITE",
  INTEGRAL = "INTEGRAL",
}

@Entity("turmas")
export class Turma extends BaseEntityAtivo {
  @Column()
  private _nome: string;

  @Column({ type: "enum", enum: Turno })
  private _turno: Turno;

  @Column()
  private _anoLetivo: number;


  @OneToMany("Aluno", "turma")
  alunos: Aluno[];

  @ManyToMany(() => Disciplina, (disciplina) => disciplina.turmas)
  @JoinTable({ name: "turmas_disciplinas" })
  disciplinas: Disciplina[];

  get nome(): string {
    return this._nome;
  }

  set nome(valor: string) {
    if (!valor || valor.trim().length < 2) {
      throw new Error("O nome da turma é obrigatório.");
    }
    this._nome = valor.trim();
  }

  get turno(): Turno {
    return this._turno;
  }

  set turno(valor: Turno) {
    if (!Object.values(Turno).includes(valor)) {
      throw new Error("Turno inválido.");
    }
    this._turno = valor;
  }

  get anoLetivo(): number {
    return this._anoLetivo;
  }

  set anoLetivo(valor: number) {
    const anoAtual = new Date().getFullYear();
    if (valor < 2000 || valor > anoAtual + 1) {
      throw new Error("Ano letivo fora do intervalo válido.");
    }
    this._anoLetivo = valor;
  }

  adicionarDisciplina(disciplina: Disciplina): void {
    if (!disciplina.isAtivo()) {
      throw new Error("Não é possível vincular disciplina inativa.");
    }
    if (!this.disciplinas) this.disciplinas = [];
    const existe = this.disciplinas.some((d) => d.id === disciplina.id);
    if (!existe) {
      this.disciplinas.push(disciplina);
    }
  }

  quantidadeAlunos(): number {
    return this.alunos ? this.alunos.filter((a) => a.isAtivo()).length : 0;
  }
}