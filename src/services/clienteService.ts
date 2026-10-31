import { ClienteRepository } from '../repositories/clienteRepository';
import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { Cliente } from '../models/clientes';

/**
 * Serviço responsável por gerir as regras de negócio e validações dos Clientes.
 */
export class ClienteService {
  constructor(
    private clienteRepo: ClienteRepository,
    private emprestimoRepo: EmprestimoRepository
  ) {}

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

  async atualizarCliente(id: number, dados: Partial<Omit<Cliente, 'id'>>): Promise<Cliente> {
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
  async removerCliente(id: number): Promise<boolean> {
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