"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
/**
 * Serviço responsável pelas regras de negócio e validações relacionadas aos Livros.
 */
class LivroService {
    livroRepo;
    autorRepo;
    emprestimoRepo;
    constructor(livroRepo, autorRepo, emprestimoRepo) {
        this.livroRepo = livroRepo;
        this.autorRepo = autorRepo;
        this.emprestimoRepo = emprestimoRepo;
    }
    /**
     * Valida a existência do autor, o título e o stock antes de registar um novo livro.
     */
    async criarLivro(titulo, anoPublicacao, quantidadeDisponivel, autorId) {
        // Validação de Negócio: O autor associado ao livro tem de existir obrigatoriamente
        const autor = await this.autorRepo.buscarPorId(autorId);
        if (!autor) {
            throw new Error('Operação inválida: O autor informado não existe.');
        }
        // Validação: O título do livro não pode estar vazio
        if (!titulo || titulo.trim() === '') {
            throw new Error('O título do livro é obrigatório.');
        }
        if (!Number.isInteger(anoPublicacao)) {
            throw new Error('O ano de publicação deve ser um número inteiro.');
        }
        if (!Number.isInteger(quantidadeDisponivel) || quantidadeDisponivel < 0) {
            throw new Error('A quantidade disponível deve ser um número inteiro não negativo.');
        }
        return this.livroRepo.criar(titulo, anoPublicacao, quantidadeDisponivel, autorId);
    }
    /**
     * Retorna a lista completa de livros.
     */
    async listarLivros() {
        return this.livroRepo.listar();
    }
    /**
     * Procura um livro por ID ou lança uma exceção se não existir.
     */
    async buscarPorId(id) {
        const livro = await this.livroRepo.buscarPorId(id);
        if (!livro) {
            throw new Error('Livro não encontrado.');
        }
        return livro;
    }
    async atualizarLivro(id, dados) {
        await this.buscarPorId(id);
        if (dados.titulo !== undefined && dados.titulo.trim() === '') {
            throw new Error('O título do livro é obrigatório.');
        }
        if (dados.quantidadeDisponivel !== undefined &&
            (!Number.isInteger(dados.quantidadeDisponivel) || dados.quantidadeDisponivel < 0)) {
            throw new Error('A quantidade disponível deve ser um número inteiro não negativo.');
        }
        if (dados.anoPublicacao !== undefined && !Number.isInteger(dados.anoPublicacao)) {
            throw new Error('O ano de publicação deve ser um número inteiro.');
        }
        if (dados.autorId !== undefined && !(await this.autorRepo.buscarPorId(dados.autorId))) {
            throw new Error('Operação inválida: O autor informado não existe.');
        }
        const livroAtualizado = await this.livroRepo.atualizar(id, dados);
        if (!livroAtualizado) {
            throw new Error('Não foi possível atualizar o livro.');
        }
        return livroAtualizado;
    }
    /**
     * Remove um livro do sistema pelo ID.
     */
    async removerLivro(id) {
        await this.buscarPorId(id);
        const emprestimos = await this.emprestimoRepo.listar();
        if (emprestimos.some(emprestimo => emprestimo.livroId === id)) {
            throw new Error('Não é possível remover um livro que possui empréstimos registrados.');
        }
        const removido = await this.livroRepo.remover(id);
        if (!removido) {
            throw new Error('Livro não encontrado para remoção.');
        }
        return true;
    }
}
exports.LivroService = LivroService;
//# sourceMappingURL=livroService.js.map