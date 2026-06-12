import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany, 
  JoinTable,
} from "typeorm";
import { Aluno } from "./aluno";
import { Disciplina } from "./disciplina";

export enum Turno {
  MANHA = "MANHA",
  TARDE = "TARDE",
  NOITE = "NOITE",
  INTEGRAL = "INTEGRAL",
}

@Entity("turmas")
export class Turma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    type: "enum",
    enum: Turno,
  })
  turno: Turno;

  @Column()
  anoLetivo: number;

  @Column({
    default: true,
  })
  ativa: boolean;

  @OneToMany(() => Aluno, (aluno) => aluno.turma)
  alunos: Aluno[];

  @ManyToMany(() => Disciplina, (disciplina) => disciplina.turmas)
  @JoinTable({
    name: "turmas_disciplinas",
  })
  disciplinas: Disciplina[];

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
