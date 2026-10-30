import { EmprestimoService } from '../services/emprestimoService';
/**
 * Controlador responsável por gerir as operações de Empréstimos e Devoluções no terminal.
 */
export declare class EmprestimoController {
    private emprestimoService;
    constructor(emprestimoService: EmprestimoService);
    /**
     * Executa a ação de realizar um empréstimo validando as regras através do serviço.
     */
    realizarEmprestimo(livroId: number, clienteId: number, dataEmprestimo: string): Promise<void>;
    /**
     * Regista a devolução de um livro e atualiza o stock correspondente.
     */
    registrarDevolucao(emprestimoId: number, dataDevolucao: string): Promise<void>;
    /**
     * Lista o histórico de todos os empréstimos efetuados.
     */
    listar(): Promise<void>;
}
//# sourceMappingURL=emprestimoController.d.ts.map