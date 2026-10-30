import { Autor } from '../models/autor';
/**
 * Repositório responsável pelo armazenamento e manipulação dos dados de Autores em memória.
 */
export declare class AutorRepository {
    private autores;
    private nextId;
    listar(): Promise<Autor[]>;
    buscarPorId(id: number): Promise<Autor | undefined>;
    criar(nome: string, nacionalidade: string, dataNascimento: string): Promise<Autor>;
    atualizar(id: number, dados: Partial<Omit<Autor, 'id'>>): Promise<Autor | undefined>;
    remover(id: number): Promise<boolean>;
}
//# sourceMappingURL=autorRepository.d.ts.map