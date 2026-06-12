import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Aluno } from "./aluno";

@Entity("responsaveis")
export class Responsavel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    unique: true,
    length: 11,
  })
  cpf: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    default: true,
  })
  ativo: boolean;

  @OneToMany(() => Aluno, (aluno) => aluno.responsavel)
  alunos: Aluno[];

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
