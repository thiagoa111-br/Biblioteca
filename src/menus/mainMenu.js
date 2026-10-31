"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenu = void 0;
const readline = __importStar(require("readline"));
/**
 * Interface de navegação via terminal CLI para a Livraria.
 */
class MainMenu {
    autorCtrl;
    livroCtrl;
    clienteCtrl;
    emprestimoCtrl;
    rl;
    constructor(autorCtrl, livroCtrl, clienteCtrl, emprestimoCtrl) {
        this.autorCtrl = autorCtrl;
        this.livroCtrl = livroCtrl;
        this.clienteCtrl = clienteCtrl;
        this.emprestimoCtrl = emprestimoCtrl;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    pergunta(query) {
        return new Promise(resolve => this.rl.question(query, resolve));
    }
    async iniciar() {
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
    async menuAutores() {
        console.log('\n--- GESTÃO DE AUTORES ---');
        console.log('1. Listar Autores');
        console.log('2. Cadastrar Autor');
        console.log('3. Consultar Autor por ID');
        console.log('4. Atualizar Autor');
        console.log('5. Remover Autor');
        console.log('0. Voltar');
        const opt = await this.pergunta('Opção: ');
        if (opt.trim() === '1') {
            await this.autorCtrl.listar();
        }
        else if (opt.trim() === '2') {
            const nome = await this.pergunta('Nome do Autor: ');
            const nac = await this.pergunta('Nacionalidade: ');
            const dataNasc = await this.pergunta('Data de Nascimento (AAAA-MM-DD): ');
            await this.autorCtrl.cadastrar(nome, nac, dataNasc);
        }
        else if (opt.trim() === '3') {
            const id = parseInt(await this.pergunta('ID do Autor: '), 10);
            await this.autorCtrl.consultar(id);
        }
        else if (opt.trim() === '4') {
            const id = parseInt(await this.pergunta('ID do Autor: '), 10);
            const nome = await this.pergunta('Novo nome: ');
            const nacionalidade = await this.pergunta('Nova nacionalidade: ');
            const dataNascimento = await this.pergunta('Nova data de nascimento (AAAA-MM-DD): ');
            await this.autorCtrl.atualizar(id, { nome, nacionalidade, dataNascimento });
        }
        else if (opt.trim() === '5') {
            const id = parseInt(await this.pergunta('ID do Autor: '), 10);
            await this.autorCtrl.remover(id);
        }
    }
    async menuLivros() {
        console.log('\n--- GESTÃO DE LIVROS ---');
        console.log('1. Listar Livros');
        console.log('2. Cadastrar Livro');
        console.log('3. Consultar Livro por ID');
        console.log('4. Atualizar Livro');
        console.log('5. Remover Livro');
        console.log('0. Voltar');
        const opt = await this.pergunta('Opção: ');
        if (opt.trim() === '1') {
            await this.livroCtrl.listar();
        }
        else if (opt.trim() === '2') {
            const titulo = await this.pergunta('Título do Livro: ');
            const ano = parseInt(await this.pergunta('Ano de Publicação: '), 10);
            const qtd = parseInt(await this.pergunta('Quantidade em Stock: '), 10);
            const autorId = parseInt(await this.pergunta('ID do Autor: '), 10);
            await this.livroCtrl.cadastrar(titulo, ano, qtd, autorId);
        }
        else if (opt.trim() === '3') {
            const id = parseInt(await this.pergunta('ID do Livro: '), 10);
            await this.livroCtrl.consultar(id);
        }
        else if (opt.trim() === '4') {
            const id = parseInt(await this.pergunta('ID do Livro: '), 10);
            const titulo = await this.pergunta('Novo título: ');
            const anoPublicacao = parseInt(await this.pergunta('Novo ano de publicação: '), 10);
            const quantidadeDisponivel = parseInt(await this.pergunta('Nova quantidade em stock: '), 10);
            const autorId = parseInt(await this.pergunta('Novo ID do Autor: '), 10);
            await this.livroCtrl.atualizar(id, { titulo, anoPublicacao, quantidadeDisponivel, autorId });
        }
        else if (opt.trim() === '5') {
            const id = parseInt(await this.pergunta('ID do Livro: '), 10);
            await this.livroCtrl.remover(id);
        }
    }
    async menuClientes() {
        console.log('\n--- GESTÃO DE CLIENTES ---');
        console.log('1. Listar Clientes');
        console.log('2. Cadastrar Cliente');
        console.log('3. Consultar Cliente por ID');
        console.log('4. Atualizar Cliente');
        console.log('5. Remover Cliente');
        console.log('0. Voltar');
        const opt = await this.pergunta('Opção: ');
        if (opt.trim() === '1') {
            await this.clienteCtrl.listar();
        }
        else if (opt.trim() === '2') {
            const nome = await this.pergunta('Nome do Cliente: ');
            const email = await this.pergunta('E-mail: ');
            const tel = await this.pergunta('Telefone: ');
            await this.clienteCtrl.cadastrar(nome, email, tel);
        }
        else if (opt.trim() === '3') {
            const id = parseInt(await this.pergunta('ID do Cliente: '), 10);
            await this.clienteCtrl.consultar(id);
        }
        else if (opt.trim() === '4') {
            const id = parseInt(await this.pergunta('ID do Cliente: '), 10);
            const nome = await this.pergunta('Novo nome: ');
            const email = await this.pergunta('Novo e-mail: ');
            const telefone = await this.pergunta('Novo telefone: ');
            await this.clienteCtrl.atualizar(id, { nome, email, telefone });
        }
        else if (opt.trim() === '5') {
            const id = parseInt(await this.pergunta('ID do Cliente: '), 10);
            await this.clienteCtrl.remover(id);
        }
    }
    async menuEmprestimos() {
        console.log('\n--- GESTÃO DE EMPRÉSTIMOS ---');
        console.log('1. Listar Histórico de Empréstimos');
        console.log('2. Realizar Empréstimo');
        console.log('3. Regista Devolução');
        console.log('4. Consultar Empréstimo por ID');
        console.log('0. Voltar');
        const opt = await this.pergunta('Opção: ');
        if (opt.trim() === '1') {
            await this.emprestimoCtrl.listar();
        }
        else if (opt.trim() === '2') {
            const livroId = parseInt(await this.pergunta('ID do Livro: '), 10);
            const clienteId = parseInt(await this.pergunta('ID do Cliente: '), 10);
            const data = await this.pergunta('Data do Empréstimo (AAAA-MM-DD): ');
            await this.emprestimoCtrl.realizarEmprestimo(livroId, clienteId, data);
        }
        else if (opt.trim() === '3') {
            const empId = parseInt(await this.pergunta('ID do Empréstimo: '), 10);
            const dataDev = await this.pergunta('Data de Devolução (AAAA-MM-DD): ');
            await this.emprestimoCtrl.registrarDevolucao(empId, dataDev);
        }
        else if (opt.trim() === '4') {
            const empId = parseInt(await this.pergunta('ID do Empréstimo: '), 10);
            await this.emprestimoCtrl.consultar(empId);
        }
    }
}
exports.MainMenu = MainMenu;
//# sourceMappingURL=mainMenu.js.map