import { Entity, Column } from "typeorm";
import { Usuario, TipoUsuario } from "./usuario";

@Entity("funcionarios")
export class Funcionario extends Usuario {
  @Column()
  private _cargo: string;

  @Column({ unique: true })
  private _matricula: string;

  constructor() {
    super();
    this._perfil = TipoUsuario.FUNCIONARIO;
  }

  get cargo(): string {
    return this._cargo;
  }

  set cargo(valor: string) {
    if (!valor || valor.trim().length < 3) {
      throw new Error("O cargo é obrigatório.");
    }
    this._cargo = valor.trim();
  }

  get matricula(): string {
    return this._matricula;
  }

  set matricula(valor: string) {
    if (!valor || valor.trim().length === 0) {
      throw new Error("A matrícula é obrigatória.");
    }
    this._matricula = valor.trim().toUpperCase();
  }

  descreverPermissoes(): string[] {
    return [
      "GERENCIAR_ALUNOS",
      "GERENCIAR_TURMAS",
      "GERENCIAR_DISCIPLINAS",
      "GERENCIAR_FREQUENCIA",
      "GERENCIAR_USUARIOS",
      "VISUALIZAR_RELATORIOS",
    ];
  }

  isCoordenador(): boolean {
    return this._cargo.toUpperCase().includes("COORDENADOR");
  }
}
