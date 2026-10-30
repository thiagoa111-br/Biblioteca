import { Cliente } from '../models/clientes';

/**
 * Repositório responsável pela persistência em memória dos dados dos Clientes.
 */
export class ClienteRepository {
  private clientes: Cliente[] = [];
  private nextId: number = 1;

  /**
   * Lista todos os clientes cadastrados.
   */
  async listar(): Promise<Cliente[]> {
    return this.clientes;
  }

  /**
   * Busca um cliente pelo seu identificador.
   */
  async buscarPorId(id: number): Promise<Cliente | undefined> {
    return this.clientes.find(c => c.id === id);
  }

  /**
   * Cadastra um novo cliente na memória.
   */
  async criar(nome: string, email: string, telefone: string): Promise<Cliente> {
    const novoCliente = new Cliente(this.nextId++, nome, email, telefone);
    this.clientes.push(novoCliente);
    return novoCliente;
  }

  /**
   * Atualiza as informações de um cliente existente.
   */
  async atualizar(id: number, dados: Partial<Omit<Cliente, 'id'>>): Promise<Cliente | undefined> {
    const cliente = await this.buscarPorId(id);
    if (!cliente) return undefined;

    if (dados.nome !== undefined) cliente.nome = dados.nome;
    if (dados.email !== undefined) cliente.email = dados.email;
    if (dados.telefone !== undefined) cliente.telefone = dados.telefone;

    return cliente;
  }

  /**
   * Remove um cliente do repositório pelo ID.
   */
  async remover(id: number): Promise<boolean> {
    const index = this.clientes.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.clientes.splice(index, 1);
    return true;
  }
}