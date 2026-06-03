import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("registros_entrada_saida")
export class RegistroEntradaSaida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "date",
  })
  data: Date;

  @Column({
    type: "timestamp",
  })
  horarioEntrada: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  horarioSaida: Date;

  @Column()
  alunoId: number;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
