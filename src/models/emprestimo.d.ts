export interface IEmprestimo {
    id: number;
    livroId: number;
    clienteId: number;
    dataEmprestimo: string;
    dataDevolucao?: string;
    status: 'ativo' | 'devolvido';
}
export declare class Emprestimo implements IEmprestimo {
    id: number;
    livroId: number;
    clienteId: number;
    dataEmprestimo: string;
    status: 'ativo' | 'devolvido';
    dataDevolucao?: string;
    constructor(id: number, livroId: number, clienteId: number, dataEmprestimo: string, dataDevolucao: string | undefined, status: 'ativo' | 'devolvido');
}
//# sourceMappingURL=emprestimo.d.ts.map