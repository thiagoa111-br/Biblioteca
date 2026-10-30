import { Emprestimo } from '../models/emprestimo';
/**
 * Repositório para gerenciamento dos registros de Empréstimos e Devoluções em memória.
 */
export declare class EmprestimoRepository {
    private emprestimos;
    private nextId;
    /**
     * Retorna o histórico de todos os empréstimos.
     */
    listar(): Promise<Emprestimo[]>;
    /**
     * Busca um empréstimo específico por ID.
     */
    buscarPorId(id: number): Promise<Emprestimo | undefined>;
    /**
     * Registra uma nova operação de empréstimo com o status inicial 'ativo'.
     */
    criar(livroId: number, clienteId: number, dataEmprestimo: string): Promise<Emprestimo>;
    /**
     * Atualiza o empréstimo definindo-o como 'devolvido' e registrando a data de devolução.
     */
    registrarDevolucao(id: number, dataDevolucao: string): Promise<Emprestimo | undefined>;
}
//# sourceMappingURL=EmprestimoRepository.d.ts.map