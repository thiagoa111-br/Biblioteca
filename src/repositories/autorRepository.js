"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorRepository = void 0;
const autor_1 = require("../models/autor");
/**
 * Repositório responsável pelo armazenamento e manipulação dos dados de Autores em memória.
 */
class AutorRepository {
    autores = [];
    nextId = 1;
    async listar() {
        return this.autores;
    }
    async buscarPorId(id) {
        return this.autores.find(a => a.id === id);
    }
    async criar(nome, nacionalidade, dataNascimento) {
        const novoAutor = new autor_1.Autor(this.nextId++, nome, nacionalidade, dataNascimento);
        this.autores.push(novoAutor);
        return novoAutor;
    }
    async atualizar(id, dados) {
        const autor = await this.buscarPorId(id);
        if (!autor)
            return undefined;
        if (dados.nome !== undefined)
            autor.nome = dados.nome;
        if (dados.nacionalidade !== undefined)
            autor.nacionalidade = dados.nacionalidade;
        if (dados.dataNascimento !== undefined)
            autor.dataNascimento = dados.dataNascimento;
        return autor;
    }
    async remover(id) {
        const index = this.autores.findIndex(a => a.id === id);
        if (index === -1)
            return false;
        this.autores.splice(index, 1);
        return true;
    }
}
exports.AutorRepository = AutorRepository;
//# sourceMappingURL=autorRepository.js.map