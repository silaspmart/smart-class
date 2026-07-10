import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn({ name: "criado_em", type: "timestamp" })
  criadoEm: Date;

  @UpdateDateColumn({ name: "atualizado_em", type: "timestamp" })
  atualizadoEm: Date;

  // Verifica se a entidade já foi salva no banco
  isNew(): boolean {
    return this.id === undefined || this.id === null;
  }
}
