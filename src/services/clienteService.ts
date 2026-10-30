import { ClienteRepository } from '../repositories/clienteRepository';
import { Cliente } from '../models/clientes';

/**
 * Serviço responsável por gerir as regras de negócio e validações dos Clientes.
 */
export class ClienteService {
  constructor(private clienteRepo: ClienteRepository) {}

  /**
   * Valida as informações obrigatórias e cadastra um novo cliente.
   */
  async criarCliente(nome: string, email: string, telefone: string): Promise<Cliente> {
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
  async listarClientes(): Promise<Cliente[]> {
    return this.clienteRepo.listar();
  }

  /**
   * Busca um cliente pelo ID.
   */
  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepo.buscarPorId(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }
    return cliente;
  }

  /**
   * Remove um cliente com base no ID.
   */
  async removerCliente(id: number): Promise<boolean> {
    const removido = await this.clienteRepo.remover(id);
    if (!removido) {
      throw new Error('Cliente não encontrado para remoção.');
    }
    return true;
  }
}