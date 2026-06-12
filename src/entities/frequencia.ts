import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, 
  JoinColumn,
} from "typeorm";
import { Aluno } from "./aluno";
import { Disciplina } from "./disciplina";

export enum StatusFrequencia {
  PRESENTE = "PRESENTE",
  AUSENTE = "AUSENTE",
  JUSTIFICADO = "JUSTIFICADO",
}

@Entity("frequencias")
export class Frequencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "date",
  })
  data: Date;

  @Column({
    type: "enum",
    enum: StatusFrequencia,
  })
  status: StatusFrequencia;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: "aluno_id" })
  aluno: Aluno;

  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: "disciplina_id" })
  disciplina: Disciplina;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
