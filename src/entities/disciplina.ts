import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
  } from "typeorm";
  import { Turma } from "./turma";
  
  @Entity("disciplinas")
  export class Disciplina {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      unique: true,
    })
    nome: string;
  
    @Column({
      default: true,
    })
    ativa: boolean;

    @ManyToMany(() => Turma, (turma) => turma.disciplinas)
    turmas: Turma[];
  
    @CreateDateColumn()
    criadoEm: Date;
  
    @UpdateDateColumn()
    atualizadoEm: Date;
  }