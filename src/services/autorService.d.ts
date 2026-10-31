import { AutorRepository } from '../repositories/autorRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { Autor } from '../models/autor';
/**
 * Serviço responsável por gerir as regras de negócio e validações associadas aos Autores.
 */
export declare class AutorService {
    private autorRepo;
    private livroRepo;
    constructor(autorRepo: AutorRepository, livroRepo: LivroRepository);
    /**
     * Valida os dados e cria um novo autor no sistema.
     */
    criarAutor(nome: string, nacionalidade: string, dataNascimento: string): Promise<Autor>;
    /**
     * Retorna a lista de todos os autores registados.
     */
    listarAutores(): Promise<Autor[]>;
    /**
     * Busca um autor pelo ID, lançando um erro caso não seja encontrado.
     */
    buscarPorId(id: number): Promise<Autor>;
    atualizarAutor(id: number, dados: Partial<Omit<Autor, 'id'>>): Promise<Autor>;
    /**
     * Remove um autor com base no ID fornecido.
     */
    removerAutor(id: number): Promise<boolean>;
}
//# sourceMappingURL=autorService.d.ts.map