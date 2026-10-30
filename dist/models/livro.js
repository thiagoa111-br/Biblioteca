"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    id;
    titulo;
    autorId;
    anoPublicacao;
    quantidadeDisponivel;
    constructor(id, titulo, autorId, anoPublicacao, quantidadeDisponivel) {
        this.id = id;
        this.titulo = titulo;
        this.autorId = autorId;
        this.anoPublicacao = anoPublicacao;
        this.quantidadeDisponivel = quantidadeDisponivel;
    }
}
exports.Livro = Livro;
//# sourceMappingURL=livro.js.map