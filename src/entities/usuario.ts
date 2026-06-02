import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum TipoUsuario {
  FUNCIONARIO = "FUNCIONARIO",
  ALUNO = "ALUNO",
  RESPONSAVEL = "RESPONSAVEL",
}

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({
    type: "enum",
    enum: TipoUsuario,
  })
  tipoUsuario: TipoUsuario;

  @Column({ default: true })
  ativo: boolean;

  @Column({ nullable: true })
  ultimoLogin: Date;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
