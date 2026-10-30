"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const clientes_1 = require("../models/clientes");
/**
 * Repositório responsável pela persistência em memória dos dados dos Clientes.
 */
class ClienteRepository {
    clientes = [];
    nextId = 1;
    /**
     * Lista todos os clientes cadastrados.
     */
    async listar() {
        return this.clientes;
    }
    /**
     * Busca um cliente pelo seu identificador.
     */
    async buscarPorId(id) {
        return this.clientes.find(c => c.id === id);
    }
    /**
     * Cadastra um novo cliente na memória.
     */
    async criar(nome, email, telefone) {
        const novoCliente = new clientes_1.Cliente(this.nextId++, nome, email, telefone);
        this.clientes.push(novoCliente);
        return novoCliente;
    }
    /**
     * Atualiza as informações de um cliente existente.
     */
    async atualizar(id, dados) {
        const cliente = await this.buscarPorId(id);
        if (!cliente)
            return undefined;
        if (dados.nome !== undefined)
            cliente.nome = dados.nome;
        if (dados.email !== undefined)
            cliente.email = dados.email;
        if (dados.telefone !== undefined)
            cliente.telefone = dados.telefone;
        return cliente;
    }
    /**
     * Remove um cliente do repositório pelo ID.
     */
    async remover(id) {
        const index = this.clientes.findIndex(c => c.id === id);
        if (index === -1)
            return false;
        this.clientes.splice(index, 1);
        return true;
    }
}
exports.ClienteRepository = ClienteRepository;
//# sourceMappingURL=clienteRepository.js.map