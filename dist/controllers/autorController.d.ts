import { AutorService } from '../services/autorService';
/**
 * Controlador responsável por gerir a interação via terminal para Autores.
 */
export declare class AutorController {
    private autorService;
    constructor(autorService: AutorService);
    /**
     * Recebe os dados do terminal, chama o serviço de cadastro e exibe o resultado ou erro.
     */
    cadastrar(nome: string, nacionalidade: string, dataNascimento: string): Promise<void>;
    /**
     * Lista todos os autores registados na consola.
     */
    listar(): Promise<void>;
}
//# sourceMappingURL=autorController.d.ts.map