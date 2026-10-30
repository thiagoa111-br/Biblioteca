import { EmprestimoService } from '../services/emprestimoService';

/**
 * Controlador responsável por gerir as operações de Empréstimos e Devoluções no terminal.
 */
export class EmprestimoController {
  constructor(private emprestimoService: EmprestimoService) {}

  /**
   * Executa a ação de realizar um empréstimo validando as regras através do serviço.
   */
  async realizarEmprestimo(livroId: number, clienteId: number, dataEmprestimo: string): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.realizarEmprestimo(livroId, clienteId, dataEmprestimo);
      console.log(`\n[Sucesso] Empréstimo #${emprestimo.id} realizado com sucesso para o livro ID ${livroId}!`);
    } catch (error: any) {
      console.error(`\n[Erro ao realizar empréstimo]: ${error.message}`);
    }
  }

  /**
   * Regista a devolução de um livro e atualiza o stock correspondente.
   */
  async registrarDevolucao(emprestimoId: number, dataDevolucao: string): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.registrarDevolucao(emprestimoId, dataDevolucao);
      console.log(`\n[Sucesso] Devolução registada para o empréstimo #${emprestimo.id}. Livro retornado ao stock!`);
    } catch (error: any) {
      console.error(`\n[Erro ao registar devolução]: ${error.message}`);
    }
  }

  /**
   * Lista o histórico de todos os empréstimos efetuados.
   */
  async listar(): Promise<void> {
    try {
      const emprestimos = await this.emprestimoService.listarEmprestimosDetalhados();
      console.log('\n--- Histórico de Empréstimos ---');
      if (emprestimos.length === 0) {
        console.log('Nenhum empréstimo registado.');
        return;
      }
      emprestimos.forEach(({ emprestimo, livroTitulo, clienteNome }) => {
        console.log(
          `ID: ${emprestimo.id} | Livro: ${livroTitulo} (ID ${emprestimo.livroId}) | Cliente: ${clienteNome} (ID ${emprestimo.clienteId}) | Data: ${emprestimo.dataEmprestimo} | Status: ${emprestimo.status}`
        );
      });
    } catch (error: any) {
      console.error(`\n[Erro ao listar empréstimos]: ${error.message}`);
    }
  }

  async consultar(emprestimoId: number): Promise<void> {
    try {
      const { emprestimo, livroTitulo, clienteNome } =
        await this.emprestimoService.consultarEmprestimoPorId(emprestimoId);
      console.log(
        `ID: ${emprestimo.id} | Livro: ${livroTitulo} (ID ${emprestimo.livroId}) | Cliente: ${clienteNome} (ID ${emprestimo.clienteId}) | Data: ${emprestimo.dataEmprestimo} | Data de devolução: ${emprestimo.dataDevolucao ?? 'Pendente'} | Status: ${emprestimo.status}`
      );
    } catch (error: any) {
      console.error(`\n[Erro ao consultar empréstimo]: ${error.message}`);
    }
  }
}