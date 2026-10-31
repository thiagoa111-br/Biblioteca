"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
/**
 * Serviço responsável por gerir as regras de negócio e validações dos Clientes.
 */
class ClienteService {
    clienteRepo;
    emprestimoRepo;
    constructor(clienteRepo, emprestimoRepo) {
        this.clienteRepo = clienteRepo;
        this.emprestimoRepo = emprestimoRepo;
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
    async atualizarCliente(id, dados) {
        await this.buscarPorId(id);
        if (dados.nome !== undefined && dados.nome.trim() === '') {
            throw new Error('O nome do cliente é obrigatório.');
        }
        if (dados.email !== undefined && dados.email.trim() === '') {
            throw new Error('O e-mail do cliente é obrigatório.');
        }
        const clienteAtualizado = await this.clienteRepo.atualizar(id, dados);
        if (!clienteAtualizado) {
            throw new Error('Não foi possível atualizar o cliente.');
        }
        return clienteAtualizado;
    }
    /**
     * Remove um cliente com base no ID.
     */
    async removerCliente(id) {
        await this.buscarPorId(id);
        const emprestimos = await this.emprestimoRepo.listar();
        if (emprestimos.some(emprestimo => emprestimo.clienteId === id)) {
            throw new Error('Não é possível remover um cliente que possui empréstimos registrados.');
        }
        const removido = await this.clienteRepo.remover(id);
        if (!removido) {
            throw new Error('Cliente não encontrado para remoção.');
        }
        return true;
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=clienteService.js.map