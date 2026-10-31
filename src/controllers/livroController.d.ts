import { LivroService } from '../services/livroService';
/**
 * Controlador responsável por gerir a interação via terminal para Livros.
 */
export declare class LivroController {
    private livroService;
    constructor(livroService: LivroService);
    /**
     * Valida a entrada do terminal e solicita o cadastro de um novo livro ao serviço.
     */
    cadastrar(titulo: string, anoPublicacao: number, quantidadeDisponivel: number, autorId: number): Promise<void>;
    /**
     * Exibe a lista completa de livros no terminal.
     */
    listar(): Promise<void>;
    consultar(id: number): Promise<void>;
    atualizar(id: number, dados: {
        titulo: string;
        anoPublicacao: number;
        quantidadeDisponivel: number;
        autorId: number;
    }): Promise<void>;
    remover(id: number): Promise<void>;
}
//# sourceMappingURL=livroController.d.ts.map