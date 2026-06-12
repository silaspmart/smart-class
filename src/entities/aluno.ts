import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, 
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Turma } from "./turma";
import { Responsavel } from "./responsavel";
import { Frequencia } from "./frequencia";

@Entity("alunos")
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  matricula: string;

  @Column()
  nome: string;

  @Column({
    type: "date",
  })
  dataNascimento: Date;

  @Column({
    default: true,
  })
  ativo: boolean;

  @ManyToOne(() => Turma, (turma) => turma.alunos)
  @JoinColumn({ name: "turma_id" })
  turma: Turma;

  @ManyToOne(() => Responsavel, (responsavel) => responsavel.alunos)
  @JoinColumn({ name: "responsavel_id" })
  responsavel: Responsavel;

  @OneToMany(() => Frequencia, (frequencia) => frequencia.aluno)
  frequencias: Frequencia[];

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
