import { Emprestimo } from '../models/emprestimo';

/**
 * Repositório para gerenciamento dos registros de Empréstimos e Devoluções em memória.
 */
export class EmprestimoRepository {
  private emprestimos: Emprestimo[] = [];
  private nextId: number = 1;

  /**
   * Retorna o histórico de todos os empréstimos.
   */
  async listar(): Promise<Emprestimo[]> {
    return this.emprestimos;
  }

  /**
   * Busca um empréstimo específico por ID.
   */
  async buscarPorId(id: number): Promise<Emprestimo | undefined> {
    return this.emprestimos.find(e => e.id === id);
  }

  /**
   * Registra uma nova operação de empréstimo com o status inicial 'ativo'.
   */
  async criar(livroId: number, clienteId: number, dataEmprestimo: string): Promise<Emprestimo> {
    const novoEmprestimo = new Emprestimo(
      this.nextId++,
      livroId,
      clienteId,
      dataEmprestimo,
      undefined,
      'ativo'
    );
    this.emprestimos.push(novoEmprestimo);
    return novoEmprestimo;
  }

  /**
   * Atualiza o empréstimo definindo-o como 'devolvido' e registrando a data de devolução.
   */
  async registrarDevolucao(id: number, dataDevolucao: string): Promise<Emprestimo | undefined> {
    const emprestimo = await this.buscarPorId(id);
    if (!emprestimo) return undefined;

    emprestimo.status = 'devolvido';
    emprestimo.dataDevolucao = dataDevolucao;
    return emprestimo;
  }
}