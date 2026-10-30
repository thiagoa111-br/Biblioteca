import { AutorRepository } from '../repositories/autorRepository';
import { Autor } from '../models/autor';

/**
 * Serviço responsável por gerir as regras de negócio e validações associadas aos Autores.
 */
export class AutorService {
  constructor(private autorRepo: AutorRepository) {}

  /**
   * Valida os dados e cria um novo autor no sistema.
   */
  async criarAutor(nome: string, nacionalidade: string, dataNascimento: string): Promise<Autor> {
    // Validação: Garante que o nome não está vazio ou preenchido apenas com espaços
    if (!nome || nome.trim() === '') {
      throw new Error('O nome do autor não pode estar vazio.');
    }
    return this.autorRepo.criar(nome, nacionalidade, dataNascimento);
  }

  /**
   * Retorna a lista de todos os autores registados.
   */
  async listarAutores(): Promise<Autor[]> {
    return this.autorRepo.listar();
  }

  /**
   * Busca um autor pelo ID, lançando um erro caso não seja encontrado.
   */
  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepo.buscarPorId(id);
    if (!autor) {
      throw new Error('Autor não encontrado.');
    }
    return autor;
  }

  /**
   * Remove um autor com base no ID fornecido.
   */
  async removerAutor(id: number): Promise<boolean> {
    const removido = await this.autorRepo.remover(id);
    if (!removido) {
      throw new Error('Autor não encontrado para remoção.');
    }
    return true;
  }
}