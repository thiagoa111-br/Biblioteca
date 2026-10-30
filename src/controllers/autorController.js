"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorController = void 0;
/**
 * Controlador responsável por gerir a interação via terminal para Autores.
 */
class AutorController {
    autorService;
    constructor(autorService) {
        this.autorService = autorService;
    }
    /**
     * Recebe os dados do terminal, chama o serviço de cadastro e exibe o resultado ou erro.
     */
    async cadastrar(nome, nacionalidade, dataNascimento) {
        try {
            const autor = await this.autorService.criarAutor(nome, nacionalidade, dataNascimento);
            console.log(`\n[Sucesso] Autor cadastrado com ID ${autor.id}: ${autor.nome}`);
        }
        catch (error) {
            console.error(`\n[Erro ao cadastrar autor]: ${error.message}`);
        }
    }
    /**
     * Lista todos os autores registados na consola.
     */
    async listar() {
        try {
            const autores = await this.autorService.listarAutores();
            console.log('\n--- Lista de Autores ---');
            if (autores.length === 0) {
                console.log('Nenhum autor registado.');
                return;
            }
            autores.forEach(a => {
                console.log(`ID: ${a.id} | Nome: ${a.nome} | Nacionalidade: ${a.nacionalidade} | Nasc.: ${a.dataNascimento}`);
            });
        }
        catch (error) {
            console.error(`\n[Erro ao listar autores]: ${error.message}`);
        }
    }
}
exports.AutorController = AutorController;
//# sourceMappingURL=autorController.js.map