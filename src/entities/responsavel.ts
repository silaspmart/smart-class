import { Entity, Column, OneToMany } from "typeorm";
import { Usuario, TipoUsuario } from "./usuario";
import type { Aluno } from "./aluno";

@Entity("responsaveis")
<<<<<<< HEAD
export class Responsavel extends BaseEntityAtivo {
  @Column({ type: "varchar" })
  private _nome: string;

  @Column({ type: "varchar", unique: true })
  private _cpf: string;

  @Column({ type: "varchar", unique: true })
  private _email: string;

=======
export class Responsavel extends Usuario {
  @Column({ unique: true, length: 11 })
  private _cpf: string;

>>>>>>> eefad2cb5e7c8b29d094a464cbcca4cba853b650
  @OneToMany("Aluno", "responsavel")
  alunos: Aluno[];

  constructor() {
    super();
    this._perfil = TipoUsuario.RESPONSAVEL;
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(valor: string) {
    const cpfLimpo = valor.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      throw new Error("CPF deve conter exatamente 11 dígitos.");
    }
    if (!this.validarCPF(cpfLimpo)) {
      throw new Error("CPF inválido.");
    }
    this._cpf = cpfLimpo;
  }

  quantidadeFilhos(): number {
    return this.alunos ? this.alunos.length : 0;
  }
<<<<<<< HEAD
}
=======

  adicionarAluno(aluno: Aluno): void {
    if (!aluno.isAtivo()) {
      throw new Error("Não é possível vincular aluno inativo.");
    }
    if (!this.alunos) this.alunos = [];
    const existe = this.alunos.some((a) => a.id === aluno.id);
    if (!existe) {
      this.alunos.push(aluno);
      aluno.vincularResponsavel(this);
    }
  }

  // ✅ Implementação do método abstrato
  descreverPermissoes(): string[] {
    return [
      "VISUALIZAR_FREQUENCIA_FILHOS",
      "VISUALIZAR_REGISTRO_FILHOS",
      "JUSTIFICAR_AUSENCIA_FILHOS",
    ];
  }

  podeJustificarAusencia(): boolean {
    return this.temPermissao("JUSTIFICAR_AUSENCIA_FILHOS");
  }

  private validarCPF(cpf: string): boolean {
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digito1 = 11 - (soma % 11);
    if (digito1 >= 10) digito1 = 0;
    if (parseInt(cpf.charAt(9)) !== digito1) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digito2 = 11 - (soma % 11);
    if (digito2 >= 10) digito2 = 0;
    if (parseInt(cpf.charAt(10)) !== digito2) return false;
    
    return true;
  }
}
>>>>>>> eefad2cb5e7c8b29d094a464cbcca4cba853b650
