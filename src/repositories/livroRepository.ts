import { Livro } from '../models/livro';

/**
 * Repositório responsável pelo armazenamento e manipulação dos dados de Livros em memória.
 */
export class LivroRepository {
  // Armazenamento em memória utilizando um array privado
  private livros: Livro[] = [];
  // Contador para simular o auto-incremento de ID do banco de dados
  private nextId: number = 1;

  /**
   * Retorna a lista completa de livros cadastrados.
   */
  async listar(): Promise<Livro[]> {
    return this.livros;
  }

  /**
   * Busca um livro específico pelo seu ID.
   * @param id Identificador único do livro.
   */
  async buscarPorId(id: number): Promise<Livro | undefined> {
    return this.livros.find(l => l.id === id);
  }

  /**
   * Instancia e cadastra um novo livro na coleção.
   */
  async criar(
    titulo: string, 
    anoPublicacao: number, 
    quantidadeDisponivel: number, 
    autorId: number
  ): Promise<Livro> {
    const novoLivro = new Livro(this.nextId++, titulo, anoPublicacao, quantidadeDisponivel, autorId);
    this.livros.push(novoLivro);
    return novoLivro;
  }

  /**
   * Atualiza parcialmente os dados de um livro existente.
   * @param id Identificador do livro a ser alterado.
   * @param dados Objeto contendo apenas os campos que serão atualizados.
   */
  async atualizar(id: number, dados: Partial<Omit<Livro, 'id'>>): Promise<Livro | undefined> {
    const livro = await this.buscarPorId(id);
    if (!livro) return undefined;

    // Atualiza apenas os campos fornecidos na requisição
    if (dados.titulo !== undefined) livro.titulo = dados.titulo;
    if (dados.anoPublicacao !== undefined) livro.anoPublicacao = dados.anoPublicacao;
    if (dados.quantidadeDisponivel !== undefined) livro.quantidadeDisponivel = dados.quantidadeDisponivel;
    if (dados.autorId !== undefined) livro.autorId = dados.autorId;

    return livro;
  }

  /**
   * Remove um livro da memória pelo ID.
   * @returns `true` se o livro foi encontrado e removido, ou `false` caso contrário.
   */
  async remover(id: number): Promise<boolean> {
    const index = this.livros.findIndex(l => l.id === id);
    if (index === -1) return false;
    
    this.livros.splice(index, 1);
    return true;
  }
}