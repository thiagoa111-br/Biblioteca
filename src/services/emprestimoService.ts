import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/clienteRepository';
import { Emprestimo } from '../models/emprestimo';

export interface EmprestimoDetalhado {
  emprestimo: Emprestimo;
  livroTitulo: string;
  clienteNome: string;
}

/**
 * Serviço responsável pelas regras de negócio e validações de Empréstimos e Devoluções.
 */
export class EmprestimoService {
  constructor(
    private emprestimoRepo: EmprestimoRepository,
    private livroRepo: LivroRepository,
    private clienteRepo: ClienteRepository
  ) {}

  /**
   * Realiza um novo empréstimo, validando a existência do livro, do cliente e a disponibilidade em stock.
   */
  async realizarEmprestimo(livroId: number, clienteId: number, dataEmprestimo: string): Promise<Emprestimo> {
    // Validação: Verifica se o livro existe
    const livro = await this.livroRepo.buscarPorId(livroId);
    if (!livro) {
      throw new Error('Livro não encontrado para empréstimo.');
    }

    // Validação: Verifica se o cliente existe
    const cliente = await this.clienteRepo.buscarPorId(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado para realizar o empréstimo.');
    }

    if (livro.quantidadeDisponivel <= 0) {
      throw new Error('Não há exemplares disponíveis deste livro em stock.');
    }

    // Decrementa a quantidade disponível no stock do livro
    livro.quantidadeDisponivel -= 1;

    // Regista e cria o empréstimo no repositório
    const novoEmprestimo = await this.emprestimoRepo.criar(livroId, clienteId, dataEmprestimo);
    return novoEmprestimo;
  }

  /**
   * Regista a devolução de um livro emprestado, atualizando o seu estado e devolvendo o exemplar ao stock.
   */
  async registrarDevolucao(emprestimoId: number, dataDevolucao: string): Promise<Emprestimo> {
    // Validação: Procura o registo do empréstimo
    const emprestimo = await this.emprestimoRepo.buscarPorId(emprestimoId);
    if (!emprestimo) {
      throw new Error('Registo de empréstimo não encontrado.');
    }

    // Validação: Verifica se o empréstimo já foi concluído anteriormente
    if (emprestimo.status === 'devolvido') {
      throw new Error('Este empréstimo já foi devolvido anteriormente.');
    }

    // Busca o livro associado para repor a quantidade no stock
    const livro = await this.livroRepo.buscarPorId(emprestimo.livroId);
    if (livro) {
      livro.quantidadeDisponivel += 1;
    }

    // Atualiza o estado do empréstimo para concluído
    const emprestimoAtualizado = await this.emprestimoRepo.registrarDevolucao(emprestimoId, dataDevolucao);
    if (!emprestimoAtualizado) {
      throw new Error('Erro ao atualizar o registo de devolução.');
    }

    return emprestimoAtualizado;
  }

  /**
   * Retorna o histórico completo de empréstimos.
   */
  async listarEmprestimos(): Promise<Emprestimo[]> {
    return this.emprestimoRepo.listar();
  }

  async consultarEmprestimoPorId(id: number): Promise<EmprestimoDetalhado> {
    const emprestimo = await this.emprestimoRepo.buscarPorId(id);
    if (!emprestimo) {
      throw new Error('Registo de empréstimo não encontrado.');
    }

    return this.detalharEmprestimo(emprestimo);
  }

  async listarEmprestimosDetalhados(): Promise<EmprestimoDetalhado[]> {
    const emprestimos = await this.emprestimoRepo.listar();
    return Promise.all(emprestimos.map(emprestimo => this.detalharEmprestimo(emprestimo)));
  }

  private async detalharEmprestimo(emprestimo: Emprestimo): Promise<EmprestimoDetalhado> {
    const livro = await this.livroRepo.buscarPorId(emprestimo.livroId);
    if (!livro) {
      throw new Error(`O livro associado ao empréstimo ${emprestimo.id} não foi encontrado.`);
    }

    const cliente = await this.clienteRepo.buscarPorId(emprestimo.clienteId);
    if (!cliente) {
      throw new Error(`O cliente associado ao empréstimo ${emprestimo.id} não foi encontrado.`);
    }

    return {
      emprestimo,
      livroTitulo: livro.titulo,
      clienteNome: cliente.nome
    };
  }
}