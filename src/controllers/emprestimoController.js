"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
/**
 * Controlador responsável por gerir as operações de Empréstimos e Devoluções no terminal.
 */
class EmprestimoController {
    emprestimoService;
    constructor(emprestimoService) {
        this.emprestimoService = emprestimoService;
    }
    /**
     * Executa a ação de realizar um empréstimo validando as regras através do serviço.
     */
    async realizarEmprestimo(livroId, clienteId, dataEmprestimo) {
        try {
            const emprestimo = await this.emprestimoService.realizarEmprestimo(livroId, clienteId, dataEmprestimo);
            console.log(`\n[Sucesso] Empréstimo #${emprestimo.id} realizado com sucesso para o livro ID ${livroId}!`);
        }
        catch (error) {
            console.error(`\n[Erro ao realizar empréstimo]: ${error.message}`);
        }
    }
    /**
     * Regista a devolução de um livro e atualiza o stock correspondente.
     */
    async registrarDevolucao(emprestimoId, dataDevolucao) {
        try {
            const emprestimo = await this.emprestimoService.registrarDevolucao(emprestimoId, dataDevolucao);
            console.log(`\n[Sucesso] Devolução registada para o empréstimo #${emprestimo.id}. Livro retornado ao stock!`);
        }
        catch (error) {
            console.error(`\n[Erro ao registar devolução]: ${error.message}`);
        }
    }
    /**
     * Lista o histórico de todos os empréstimos efetuados.
     */
    async listar() {
        try {
            const emprestimos = await this.emprestimoService.listarEmprestimos();
            console.log('\n--- Histórico de Empréstimos ---');
            if (emprestimos.length === 0) {
                console.log('Nenhum empréstimo registado.');
                return;
            }
            emprestimos.forEach(e => {
                console.log(`ID: ${e.id} | Livro ID: ${e.livroId} | Cliente ID: ${e.clienteId} | Data: ${e.dataEmprestimo} | Status: ${e.status}`);
            });
        }
        catch (error) {
            console.error(`\n[Erro ao listar empréstimos]: ${error.message}`);
        }
    }
}
exports.EmprestimoController = EmprestimoController;
//# sourceMappingURL=emprestimoController.js.map