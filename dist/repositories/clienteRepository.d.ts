import { Cliente } from '../models/clientes';
/**
 * Repositório responsável pela persistência em memória dos dados dos Clientes.
 */
export declare class ClienteRepository {
    private clientes;
    private nextId;
    /**
     * Lista todos os clientes cadastrados.
     */
    listar(): Promise<Cliente[]>;
    /**
     * Busca um cliente pelo seu identificador.
     */
    buscarPorId(id: number): Promise<Cliente | undefined>;
    /**
     * Cadastra um novo cliente na memória.
     */
    criar(nome: string, email: string, telefone: string): Promise<Cliente>;
    /**
     * Atualiza as informações de um cliente existente.
     */
    atualizar(id: number, dados: Partial<Omit<Cliente, 'id'>>): Promise<Cliente | undefined>;
    /**
     * Remove um cliente do repositório pelo ID.
     */
    remover(id: number): Promise<boolean>;
}
//# sourceMappingURL=clienteRepository.d.ts.map