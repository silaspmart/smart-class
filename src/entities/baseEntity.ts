import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "criado_em" })
  criadoEm: Date;

  @UpdateDateColumn({ name: "atualizado_em" })
  atualizadoEm: Date;

  // Verifica se a entidade já foi salva no banco
  isNew(): boolean {
    return this.id === undefined || this.id === null;
  }
}