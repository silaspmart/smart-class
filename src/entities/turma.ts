import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
