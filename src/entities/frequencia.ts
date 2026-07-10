import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Aluno } from "./aluno";
import { Disciplina } from "./disciplina";

export enum StatusFrequencia {
  PRESENTE = "PRESENTE",
  AUSENTE = "AUSENTE",
  JUSTIFICADO = "JUSTIFICADO",
}

@Entity("frequencias")
export class Frequencia extends BaseEntity {
  @Column({ type: "date" })
  private _data: Date;

  @Column({ type: "enum", enum: StatusFrequencia })
  private _status: StatusFrequencia;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: "aluno_id" })
  aluno: Aluno;

  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: "disciplina_id" })
  disciplina: Disciplina;

  get data(): Date {
    return this._data;
  }

  set data(valor: Date) {
    if (!valor) throw new Error("A data é obrigatória.");
    this._data = valor;
  }

  get status(): StatusFrequencia {
    return this._status;
  }

  set status(valor: StatusFrequencia) {
    if (!Object.values(StatusFrequencia).includes(valor)) {
      throw new Error("Status de frequência inválido.");
    }
    this._status = valor;
  }

  // --- Métodos de Domínio ---
  marcarPresente(): void {
    this._status = StatusFrequencia.PRESENTE;
  }

  marcarAusente(): void {
    this._status = StatusFrequencia.AUSENTE;
  }

  justificarAusencia(): void {
    if (this._status !== StatusFrequencia.AUSENTE) {
      throw new Error("Só é possível justificar uma ausência registrada.");
    }
    this._status = StatusFrequencia.JUSTIFICADO;
  }

  isPresente(): boolean {
    return this._status === StatusFrequencia.PRESENTE;
  }
}