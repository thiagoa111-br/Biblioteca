"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
/**
 * Controlador responsável por gerir a interação via terminal para Livros.
 */
class LivroController {
    livroService;
    constructor(livroService) {
        this.livroService = livroService;
    }
    /**
     * Valida a entrada do terminal e solicita o cadastro de um novo livro ao serviço.
     */
    async cadastrar(titulo, anoPublicacao, quantidadeDisponivel, autorId) {
        try {
            const livro = await this.livroService.criarLivro(titulo, anoPublicacao, quantidadeDisponivel, autorId);
            console.log(`\n[Sucesso] Livro cadastrado com ID ${livro.id}: ${livro.titulo}`);
        }
        catch (error) {
            console.error(`\n[Erro ao cadastrar livro]: ${error.message}`);
        }
    }
    /**
     * Exibe a lista completa de livros no terminal.
     */
    async listar() {
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
        }
        catch (error) {
            console.error(`\n[Erro ao listar livros]: ${error.message}`);
        }
    }
}
exports.LivroController = LivroController;
//# sourceMappingURL=livroController.js.map