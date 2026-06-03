import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column()
  alunoId: number;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
