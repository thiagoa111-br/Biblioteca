import { ClienteRepository } from '../repositories/clienteRepository';
import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { Cliente } from '../models/clientes';
/**
 * Serviço responsável por gerir as regras de negócio e validações dos Clientes.
 */
export declare class ClienteService {
    private clienteRepo;
    private emprestimoRepo;
    constructor(clienteRepo: ClienteRepository, emprestimoRepo: EmprestimoRepository);
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
    atualizarCliente(id: number, dados: Partial<Omit<Cliente, 'id'>>): Promise<Cliente>;
    /**
     * Remove um cliente com base no ID.
     */
    removerCliente(id: number): Promise<boolean>;
}
//# sourceMappingURL=clienteService.d.ts.map