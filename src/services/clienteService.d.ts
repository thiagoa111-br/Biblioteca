import { ClienteRepository } from '../repositories/clienteRepository';
import { Cliente } from '../models/clientes';
/**
 * Serviço responsável por gerir as regras de negócio e validações dos Clientes.
 */
export declare class ClienteService {
    private clienteRepo;
    constructor(clienteRepo: ClienteRepository);
    /**
     * Valida as informações obrigatórias e cadastra um novo cliente.
     */
    criarCliente(nome: string, email: string, telefone: string): Promise<Cliente>;
    /**
     * Lista todos os clientes registados.
     */
    listarClientes(): Promise<Cliente[]>;
    /**
     * Busca um cliente pelo ID.
     */
    buscarPorId(id: number): Promise<Cliente>;
    /**
     * Remove um cliente com base no ID.
     */
    removerCliente(id: number): Promise<boolean>;
}
//# sourceMappingURL=clienteService.d.ts.map