"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
const emprestimo_1 = require("../models/emprestimo");
/**
 * Repositório para gerenciamento dos registros de Empréstimos e Devoluções em memória.
 */
class EmprestimoRepository {
    emprestimos = [];
    nextId = 1;
    /**
     * Retorna o histórico de todos os empréstimos.
     */
    async listar() {
        return this.emprestimos;
    }
    /**
     * Busca um empréstimo específico por ID.
     */
    async buscarPorId(id) {
        return this.emprestimos.find(e => e.id === id);
    }
    /**
     * Registra uma nova operação de empréstimo com o status inicial 'ativo'.
     */
    async criar(livroId, clienteId, dataEmprestimo) {
        const novoEmprestimo = new emprestimo_1.Emprestimo(this.nextId++, livroId, clienteId, dataEmprestimo, undefined, 'ativo');
        this.emprestimos.push(novoEmprestimo);
        return novoEmprestimo;
    }
    /**
     * Atualiza o empréstimo definindo-o como 'devolvido' e registrando a data de devolução.
     */
    async registrarDevolucao(id, dataDevolucao) {
        const emprestimo = await this.buscarPorId(id);
        if (!emprestimo)
            return undefined;
        emprestimo.status = 'devolvido';
        emprestimo.dataDevolucao = dataDevolucao;
        return emprestimo;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
//# sourceMappingURL=EmprestimoRepository.js.map