"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
/**
 * Controlador responsável por gerir a interação via terminal para Clientes.
 */
class ClienteController {
    clienteService;
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    /**
     * Cadastra um cliente e exibe o resultado ou erro.
     */
    async cadastrar(nome, email, telefone) {
        try {
            const cliente = await this.clienteService.criarCliente(nome, email, telefone);
            console.log(`\n[Sucesso] Cliente cadastrado com ID ${cliente.id}: ${cliente.nome}`);
        }
        catch (error) {
            console.error(`\n[Erro ao cadastrar cliente]: ${error.message}`);
        }
    }
    /**
     * Lista todos os clientes registados na consola.
     */
    async listar() {
        try {
            const clientes = await this.clienteService.listarClientes();
            console.log('\n--- Lista de Clientes ---');
            if (clientes.length === 0) {
                console.log('Nenhum cliente registado.');
                return;
            }
            clientes.forEach(cliente => {
                console.log(`ID: ${cliente.id} | Nome: ${cliente.nome} | E-mail: ${cliente.email} | Telefone: ${cliente.telefone}`);
            });
        }
        catch (error) {
            console.error(`\n[Erro ao listar clientes]: ${error.message}`);
        }
    }
}
exports.ClienteController = ClienteController;
//# sourceMappingURL=clienteController.js.map