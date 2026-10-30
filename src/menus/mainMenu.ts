import * as readline from 'readline';
import { AutorController } from '../controllers/autorController';
import { LivroController } from '../controllers/livroController';
import { ClienteController } from '../controllers/clienteController';
import { EmprestimoController } from '../controllers/emprestimoController';

/**
 * Interface de navegação via terminal CLI para a Livraria.
 */
export class MainMenu {
  private rl: readline.Interface;

  constructor(
    private autorCtrl: AutorController,
    private livroCtrl: LivroController,
    private clienteCtrl: ClienteController,
    private emprestimoCtrl: EmprestimoController
  ) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  private pergunta(query: string): Promise<string> {
    return new Promise(resolve => this.rl.question(query, resolve));
  }

  public async iniciar(): Promise<void> {
    let sair = false;

    while (!sair) {
      console.log('\n====================================');
      console.log('      BOOKSTORE MANAGER CLI         ');
      console.log('====================================');
      console.log('1. Gerir Autores');
      console.log('2. Gerir Livros');
      console.log('3. Gerir Clientes');
      console.log('4. Gerir Empréstimos');
      console.log('0. Sair');
      console.log('====================================');

      const opcao = await this.pergunta('Escolha uma opção: ');

      switch (opcao.trim()) {
        case '1':
          await this.menuAutores();
          break;
        case '2':
          await this.menuLivros();
          break;
        case '3':
          await this.menuClientes();
          break;
        case '4':
          await this.menuEmprestimos();
          break;
        case '0':
          sair = true;
          console.log('\nA encerrar a aplicação... Até breve!');
          this.rl.close();
          break;
        default:
          console.log('\nOpção inválida! Tente novamente.');
      }
    }
  }

  private async menuAutores(): Promise<void> {
    console.log('\n--- GESTÃO DE AUTORES ---');
    console.log('1. Listar Autores');
    console.log('2. Cadastrar Autor');
    console.log('3. Consultar Autor por ID');
    console.log('0. Voltar');

    const opt = await this.pergunta('Opção: ');

    if (opt.trim() === '1') {
      await this.autorCtrl.listar();
    } else if (opt.trim() === '2') {
      const nome = await this.pergunta('Nome do Autor: ');
      const nac = await this.pergunta('Nacionalidade: ');
      const dataNasc = await this.pergunta('Data de Nascimento (AAAA-MM-DD): ');
      await this.autorCtrl.cadastrar(nome, nac, dataNasc);
    } else if (opt.trim() === '3') {
      const id = parseInt(await this.pergunta('ID do Autor: '), 10);
      await this.autorCtrl.consultar(id);
    }
  }

  private async menuLivros(): Promise<void> {
    console.log('\n--- GESTÃO DE LIVROS ---');
    console.log('1. Listar Livros');
    console.log('2. Cadastrar Livro');
    console.log('3. Consultar Livro por ID');
    console.log('0. Voltar');

    const opt = await this.pergunta('Opção: ');

    if (opt.trim() === '1') {
      await this.livroCtrl.listar();
    } else if (opt.trim() === '2') {
      const titulo = await this.pergunta('Título do Livro: ');
      const ano = parseInt(await this.pergunta('Ano de Publicação: '), 10);
      const qtd = parseInt(await this.pergunta('Quantidade em Stock: '), 10);
      const autorId = parseInt(await this.pergunta('ID do Autor: '), 10);
      await this.livroCtrl.cadastrar(titulo, ano, qtd, autorId);
    } else if (opt.trim() === '3') {
      const id = parseInt(await this.pergunta('ID do Livro: '), 10);
      await this.livroCtrl.consultar(id);
    }
  }

  private async menuClientes(): Promise<void> {
    console.log('\n--- GESTÃO DE CLIENTES ---');
    console.log('1. Listar Clientes');
    console.log('2. Cadastrar Cliente');
    console.log('3. Consultar Cliente por ID');
    console.log('0. Voltar');

    const opt = await this.pergunta('Opção: ');

    if (opt.trim() === '1') {
      await this.clienteCtrl.listar();
    } else if (opt.trim() === '2') {
      const nome = await this.pergunta('Nome do Cliente: ');
      const email = await this.pergunta('E-mail: ');
      const tel = await this.pergunta('Telefone: ');
      await this.clienteCtrl.cadastrar(nome, email, tel);
    } else if (opt.trim() === '3') {
      const id = parseInt(await this.pergunta('ID do Cliente: '), 10);
      await this.clienteCtrl.consultar(id);
    }
  }

  private async menuEmprestimos(): Promise<void> {
    console.log('\n--- GESTÃO DE EMPRÉSTIMOS ---');
    console.log('1. Listar Histórico de Empréstimos');
    console.log('2. Realizar Empréstimo');
    console.log('3. Regista Devolução');
    console.log('4. Consultar Empréstimo por ID');
    console.log('0. Voltar');

    const opt = await this.pergunta('Opção: ');

    if (opt.trim() === '1') {
      await this.emprestimoCtrl.listar();
    } else if (opt.trim() === '2') {
      const livroId = parseInt(await this.pergunta('ID do Livro: '), 10);
      const clienteId = parseInt(await this.pergunta('ID do Cliente: '), 10);
      const data = await this.pergunta('Data do Empréstimo (AAAA-MM-DD): ');
      await this.emprestimoCtrl.realizarEmprestimo(livroId, clienteId, data);
    } else if (opt.trim() === '3') {
      const empId = parseInt(await this.pergunta('ID do Empréstimo: '), 10);
      const dataDev = await this.pergunta('Data de Devolução (AAAA-MM-DD): ');
      await this.emprestimoCtrl.registrarDevolucao(empId, dataDev);
    } else if (opt.trim() === '4') {
      const empId = parseInt(await this.pergunta('ID do Empréstimo: '), 10);
      await this.emprestimoCtrl.consultar(empId);
    }
  }
}