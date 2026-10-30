import { ClienteService } from '../services/clienteService';
/**
 * Controlador responsável por gerir a interação via terminal para Clientes.
 */
export declare class ClienteController {
    private clienteService;
    constructor(clienteService: ClienteService);
    /**
     * Cadastra um cliente e exibe o resultado ou erro.
     */
    cadastrar(nome: string, email: string, telefone: string): Promise<void>;
    /**
     * Lista todos os clientes registados na consola.
     */
    listar(): Promise<void>;
}
//# sourceMappingURL=clienteController.d.ts.map