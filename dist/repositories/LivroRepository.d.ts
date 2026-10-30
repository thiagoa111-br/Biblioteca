import { Livro } from '../models/livro';
/**
 * Repositório responsável pelo armazenamento e manipulação dos dados de Livros em memória.
 */
export declare class LivroRepository {
    private livros;
    private nextId;
    /**
     * Retorna a lista completa de livros cadastrados.
     */
    listar(): Promise<Livro[]>;
    /**
     * Busca um livro específico pelo seu ID.
     * @param id Identificador único do livro.
     */
    buscarPorId(id: number): Promise<Livro | undefined>;
    /**
     * Instancia e cadastra um novo livro na coleção.
     */
    criar(titulo: string, anoPublicacao: number, quantidadeDisponivel: number, autorId: number): Promise<Livro>;
    /**
     * Atualiza parcialmente os dados de um livro existente.
     * @param id Identificador do livro a ser alterado.
     * @param dados Objeto contendo apenas os campos que serão atualizados.
     */
    atualizar(id: number, dados: Partial<Omit<Livro, 'id'>>): Promise<Livro | undefined>;
    /**
     * Remove um livro da memória pelo ID.
     * @returns `true` se o livro foi encontrado e removido, ou `false` caso contrário.
     */
    remover(id: number): Promise<boolean>;
}
//# sourceMappingURL=LivroRepository.d.ts.map