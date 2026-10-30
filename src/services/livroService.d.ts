import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/autorRepository';
import { Livro } from '../models/livro';
/**
 * Serviço responsável pelas regras de negócio e validações relacionadas aos Livros.
 */
export declare class LivroService {
    private livroRepo;
    private autorRepo;
    constructor(livroRepo: LivroRepository, autorRepo: AutorRepository);
    /**
     * Valida a existência do autor, o título e o stock antes de registar um novo livro.
     */
    criarLivro(titulo: string, anoPublicacao: number, quantidadeDisponivel: number, autorId: number): Promise<Livro>;
    /**
     * Retorna a lista completa de livros.
     */
    listarLivros(): Promise<Livro[]>;
    /**
     * Procura um livro por ID ou lança uma exceção se não existir.
     */
    buscarPorId(id: number): Promise<Livro>;
    /**
     * Remove um livro do sistema pelo ID.
     */
    removerLivro(id: number): Promise<boolean>;
}
//# sourceMappingURL=livroService.d.ts.map