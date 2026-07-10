import { Column } from "typeorm";
import { BaseEntity } from "./baseEntity";

export abstract class BaseEntityAtivo extends BaseEntity {
  @Column({
    type: "boolean",
    default: true,
  })
  ativo!: boolean;

  ativar(): void {
    this.ativo = true;
  }

  desativar(): void {
    this.ativo = false;
  }

  isAtivo(): boolean {
    return this.ativo;
  }
}
