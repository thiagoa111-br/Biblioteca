import { LivroService } from '../services/livroService';

/**
 * Controlador responsável por gerir a interação via terminal para Livros.
 */
export class LivroController {
  constructor(private livroService: LivroService) {}

  /**
   * Valida a entrada do terminal e solicita o cadastro de um novo livro ao serviço.
   */
  async cadastrar(titulo: string, anoPublicacao: number, quantidadeDisponivel: number, autorId: number): Promise<void> {
    try {
      const livro = await this.livroService.criarLivro(titulo, anoPublicacao, quantidadeDisponivel, autorId);
      console.log(`\n[Sucesso] Livro cadastrado com ID ${livro.id}: ${livro.titulo}`);
    } catch (error: any) {
      console.error(`\n[Erro ao cadastrar livro]: ${error.message}`);
    }
  }

  /**
   * Exibe a lista completa de livros no terminal.
   */
  async listar(): Promise<void> {
    try {
      const livros = await this.livroService.listarLivros();
      console.log('\n--- Lista de Livros ---');
      if (livros.length === 0) {
        console.log('Nenhum livro registado.');
        return;
      }
      livros.forEach(l => {
        console.log(`ID: ${l.id} | Título: ${l.titulo} | Ano: ${l.anoPublicacao} | Stock: ${l.quantidadeDisponivel} | ID Autor: ${l.autorId}`);
      });
    } catch (error: any) {
      console.error(`\n[Erro ao listar livros]: ${error.message}`);
    }
  }

  async consultar(id: number): Promise<void> {
    try {
      const livro = await this.livroService.buscarPorId(id);
      console.log(
        `ID: ${livro.id} | Título: ${livro.titulo} | Ano: ${livro.anoPublicacao} | Stock: ${livro.quantidadeDisponivel} | ID Autor: ${livro.autorId}`
      );
    } catch (error: any) {
      console.error(`\n[Erro ao consultar livro]: ${error.message}`);
    }
  }

  async atualizar(
    id: number,
    dados: { titulo: string; anoPublicacao: number; quantidadeDisponivel: number; autorId: number }
  ): Promise<void> {
    try {
      const livro = await this.livroService.atualizarLivro(id, dados);
      console.log(`\n[Sucesso] Livro ${livro.id} atualizado: ${livro.titulo}`);
    } catch (error: any) {
      console.error(`\n[Erro ao atualizar livro]: ${error.message}`);
    }
  }

  async remover(id: number): Promise<void> {
    try {
      await this.livroService.removerLivro(id);
      console.log(`\n[Sucesso] Livro ${id} removido.`);
    } catch (error: any) {
      console.error(`\n[Erro ao remover livro]: ${error.message}`);
    }
  }
}