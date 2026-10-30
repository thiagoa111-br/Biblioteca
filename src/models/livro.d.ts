export interface ILivro {
    id: number;
    titulo: string;
    autorId: number;
    anoPublicacao: number;
    quantidadeDisponivel: number;
}
export declare class Livro implements ILivro {
    id: number;
    titulo: string;
    autorId: number;
    anoPublicacao: number;
    quantidadeDisponivel: number;
    constructor(id: number, titulo: string, autorId: number, anoPublicacao: number, quantidadeDisponivel: number);
}
//# sourceMappingURL=livro.d.ts.map