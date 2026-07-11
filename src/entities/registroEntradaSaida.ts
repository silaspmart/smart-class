import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Aluno } from "./aluno";

@Entity("registros_entrada_saida")
export class RegistroEntradaSaida extends BaseEntity {
  @Column({ type: "date" })
  private _data: Date;

  @Column({ type: "timestamp" })
  private _horarioEntrada: Date;

  @Column({ type: "timestamp", nullable: true })
  private _horarioSaida: Date;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: "aluno_id" })
  aluno: Aluno;

  // --- Encapsulamento ---
  get data(): Date {
    return this._data;
  }

  set data(valor: Date) {
    if (!valor) throw new Error("A data é obrigatória.");
    this._data = valor;
  }

  get horarioEntrada(): Date {
    return this._horarioEntrada;
  }

  set horarioEntrada(valor: Date) {
    if (!valor) throw new Error("O horário de entrada é obrigatório.");
    this._horarioEntrada = valor;
  }

  get horarioSaida(): Date | null {
    return this._horarioSaida;
  }

  // --- Métodos de Domínio ---
  registrarSaida(): void {
    if (this._horarioSaida) {
      throw new Error("A saída já foi registrada para este registro.");
    }
    if (this._horarioEntrada > new Date()) {
      throw new Error("Não é possível registrar saída antes da entrada.");
    }
    this._horarioSaida = new Date();
  }

  isSaidaRegistrada(): boolean {
    return this._horarioSaida !== null && this._horarioSaida !== undefined;
  }

  calcularPermanencia(): number {
    if (!this.isSaidaRegistrada()) {
      throw new Error("A saída ainda não foi registrada.");
    }
    const entrada = new Date(this._horarioEntrada).getTime();
    const saida = new Date(this._horarioSaida).getTime();
    return (saida - entrada) / (1000 * 60 * 60); // em horas
  }
}
