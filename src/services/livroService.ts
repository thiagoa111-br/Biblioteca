import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/autorRepository';
import { Livro } from '../models/livro';

/**
 * Serviço responsável pelas regras de negócio e validações relacionadas aos Livros.
 */
export class LivroService {
  constructor(
    private livroRepo: LivroRepository,
    private autorRepo: AutorRepository
  ) {}

  /**
   * Valida a existência do autor, o título e o stock antes de registar um novo livro.
   */
  async criarLivro(titulo: string, anoPublicacao: number, quantidadeDisponivel: number, autorId: number): Promise<Livro> {
    // Validação de Negócio: O autor associado ao livro tem de existir obrigatoriamente
    const autor = await this.autorRepo.buscarPorId(autorId);
    if (!autor) {
      throw new Error('Operação inválida: O autor informado não existe.');
    }

    // Validação: O título do livro não pode estar vazio
    if (!titulo || titulo.trim() === '') {
      throw new Error('O título do livro é obrigatório.');
    }

    // Validação: A quantidade em stock não pode ser negativa
    if (quantidadeDisponivel < 0) {
      throw new Error('A quantidade disponível não pode ser negativa.');
    }

    return this.livroRepo.criar(titulo, anoPublicacao, quantidadeDisponivel, autorId);
  }

  /**
   * Retorna a lista completa de livros.
   */
  async listarLivros(): Promise<Livro[]> {
    return this.livroRepo.listar();
  }

  /**
   * Procura um livro por ID ou lança uma exceção se não existir.
   */
  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepo.buscarPorId(id);
    if (!livro) {
      throw new Error('Livro não encontrado.');
    }
    return livro;
  }

  /**
   * Remove um livro do sistema pelo ID.
   */
  async removerLivro(id: number): Promise<boolean> {
    const removido = await this.livroRepo.remover(id);
    if (!removido) {
      throw new Error('Livro não encontrado para remoção.');
    }
    return true;
  }
}