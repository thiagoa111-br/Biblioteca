"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    id;
    livroId;
    clienteId;
    dataEmprestimo;
    status;
    dataDevolucao;
    constructor(id, livroId, clienteId, dataEmprestimo, dataDevolucao, status) {
        this.id = id;
        this.livroId = livroId;
        this.clienteId = clienteId;
        this.dataEmprestimo = dataEmprestimo;
        this.status = status;
        if (dataDevolucao !== undefined) {
            this.dataDevolucao = dataDevolucao;
        }
    }
}
exports.Emprestimo = Emprestimo;
//# sourceMappingURL=emprestimo.js.map