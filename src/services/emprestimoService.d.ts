import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/clienteRepository';
import { Emprestimo } from '../models/emprestimo';
export interface EmprestimoDetalhado {
    emprestimo: Emprestimo;
    livroTitulo: string;
    clienteNome: string;
}
/**
 * Serviço responsável pelas regras de negócio e validações de Empréstimos e Devoluções.
 */
export declare class EmprestimoService {
    private emprestimoRepo;
    private livroRepo;
    private clienteRepo;
    constructor(emprestimoRepo: EmprestimoRepository, livroRepo: LivroRepository, clienteRepo: ClienteRepository);
    /**
     * Realiza um novo empréstimo, validando a existência do livro, do cliente e a disponibilidade em stock.
     */
    realizarEmprestimo(livroId: number, clienteId: number, dataEmprestimo: string): Promise<Emprestimo>;
    /**
     * Regista a devolução de um livro emprestado, atualizando o seu estado e devolvendo o exemplar ao stock.
     */
    registrarDevolucao(emprestimoId: number, dataDevolucao: string): Promise<Emprestimo>;
    /**
     * Retorna o histórico completo de empréstimos.
     */
    listarEmprestimos(): Promise<Emprestimo[]>;
    consultarEmprestimoPorId(id: number): Promise<EmprestimoDetalhado>;
    listarEmprestimosDetalhados(): Promise<EmprestimoDetalhado[]>;
    private detalharEmprestimo;
}
//# sourceMappingURL=emprestimoService.d.ts.map