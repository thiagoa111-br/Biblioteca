import { ClienteService } from '../services/clienteService';

/**
 * Controlador responsável por gerir a interação via terminal para Clientes.
 */
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  /**
   * Cadastra um cliente e exibe o resultado ou erro.
   */
  async cadastrar(nome: string, email: string, telefone: string): Promise<void> {
    try {
      const cliente = await this.clienteService.criarCliente(nome, email, telefone);
      console.log(`\n[Sucesso] Cliente cadastrado com ID ${cliente.id}: ${cliente.nome}`);
    } catch (error: any) {
      console.error(`\n[Erro ao cadastrar cliente]: ${error.message}`);
    }
  }

  /**
   * Lista todos os clientes registados na consola.
   */
  async listar(): Promise<void> {
    try {
      const clientes = await this.clienteService.listarClientes();
      console.log('\n--- Lista de Clientes ---');
      if (clientes.length === 0) {
        console.log('Nenhum cliente registado.');
        return;
      }

      clientes.forEach(cliente => {
        console.log(
          `ID: ${cliente.id} | Nome: ${cliente.nome} | E-mail: ${cliente.email} | Telefone: ${cliente.telefone}`
        );
      });
    } catch (error: any) {
      console.error(`\n[Erro ao listar clientes]: ${error.message}`);
    }
  }

  async consultar(id: number): Promise<void> {
    try {
      const cliente = await this.clienteService.buscarPorId(id);
      console.log(
        `ID: ${cliente.id} | Nome: ${cliente.nome} | E-mail: ${cliente.email} | Telefone: ${cliente.telefone}`
      );
    } catch (error: any) {
      console.error(`\n[Erro ao consultar cliente]: ${error.message}`);
    }
  }
}
