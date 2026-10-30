"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
/**
 * Serviço responsável por gerir as regras de negócio e validações dos Clientes.
 */
class ClienteService {
    clienteRepo;
    constructor(clienteRepo) {
        this.clienteRepo = clienteRepo;
    }
    /**
     * Valida as informações obrigatórias e cadastra um novo cliente.
     */
    async criarCliente(nome, email, telefone) {
        // Validação: O nome do cliente é obrigatório
        if (!nome || nome.trim() === '') {
            throw new Error('O nome do cliente é obrigatório.');
        }
        // Validação: O e-mail do cliente é obrigatório
        if (!email || email.trim() === '') {
            throw new Error('O e-mail do cliente é obrigatório.');
        }
        return this.clienteRepo.criar(nome, email, telefone);
    }
    /**
     * Lista todos os clientes registados.
     */
    async listarClientes() {
        return this.clienteRepo.listar();
    }
    /**
     * Busca um cliente pelo ID.
     */
    async buscarPorId(id) {
        const cliente = await this.clienteRepo.buscarPorId(id);
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }
        return cliente;
    }
    /**
     * Remove um cliente com base no ID.
     */
    async removerCliente(id) {
        const removido = await this.clienteRepo.remover(id);
        if (!removido) {
            throw new Error('Cliente não encontrado para remoção.');
        }
        return true;
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=clienteService.js.map