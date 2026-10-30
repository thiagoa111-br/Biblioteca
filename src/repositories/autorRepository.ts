import { Autor } from '../models/autor';

/**
 * Repositório responsável pelo armazenamento e manipulação dos dados de Autores em memória.
 */
export class AutorRepository {
  private autores: Autor[] = [];
  private nextId: number = 1;

  async listar(): Promise<Autor[]> {
    return this.autores;
  }

  async buscarPorId(id: number): Promise<Autor | undefined> {
    return this.autores.find(a => a.id === id);
  }

  async criar(nome: string, nacionalidade: string, dataNascimento: string): Promise<Autor> {
    const novoAutor = new Autor(this.nextId++, nome, nacionalidade, dataNascimento);
    this.autores.push(novoAutor);
    return novoAutor;
  }

  async atualizar(id: number, dados: Partial<Omit<Autor, 'id'>>): Promise<Autor | undefined> {
    const autor = await this.buscarPorId(id);
    if (!autor) return undefined;

    if (dados.nome !== undefined) autor.nome = dados.nome;
    if (dados.nacionalidade !== undefined) autor.nacionalidade = dados.nacionalidade;
    if (dados.dataNascimento !== undefined) autor.dataNascimento = dados.dataNascimento;

    return autor;
  }

  async remover(id: number): Promise<boolean> {
    const index = this.autores.findIndex(a => a.id === id);
    if (index === -1) return false;
    
    this.autores.splice(index, 1);
    return true;
  }
}