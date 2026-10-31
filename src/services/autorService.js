"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorService = void 0;
/**
 * Serviço responsável por gerir as regras de negócio e validações associadas aos Autores.
 */
class AutorService {
    autorRepo;
    livroRepo;
    constructor(autorRepo, livroRepo) {
        this.autorRepo = autorRepo;
        this.livroRepo = livroRepo;
    }
    /**
     * Valida os dados e cria um novo autor no sistema.
     */
    async criarAutor(nome, nacionalidade, dataNascimento) {
        // Validação: Garante que o nome não está vazio ou preenchido apenas com espaços
        if (!nome || nome.trim() === '') {
            throw new Error('O nome do autor não pode estar vazio.');
        }
        return this.autorRepo.criar(nome, nacionalidade, dataNascimento);
    }
    /**
     * Retorna a lista de todos os autores registados.
     */
    async listarAutores() {
        return this.autorRepo.listar();
    }
    /**
     * Busca um autor pelo ID, lançando um erro caso não seja encontrado.
     */
    async buscarPorId(id) {
        const autor = await this.autorRepo.buscarPorId(id);
        if (!autor) {
            throw new Error('Autor não encontrado.');
        }
        return autor;
    }
    async atualizarAutor(id, dados) {
        await this.buscarPorId(id);
        if (dados.nome !== undefined && dados.nome.trim() === '') {
            throw new Error('O nome do autor não pode estar vazio.');
        }
        const autorAtualizado = await this.autorRepo.atualizar(id, dados);
        if (!autorAtualizado) {
            throw new Error('Não foi possível atualizar o autor.');
        }
        return autorAtualizado;
    }
    /**
     * Remove um autor com base no ID fornecido.
     */
    async removerAutor(id) {
        await this.buscarPorId(id);
        const livros = await this.livroRepo.listar();
        if (livros.some(livro => livro.autorId === id)) {
            throw new Error('Não é possível remover um autor que possui livros cadastrados.');
        }
        const removido = await this.autorRepo.remover(id);
        if (!removido) {
            throw new Error('Autor não encontrado para remoção.');
        }
        return true;
    }
}
exports.AutorService = AutorService;
//# sourceMappingURL=autorService.js.map