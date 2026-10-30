import { AutorController } from '../controllers/autorController';
import { LivroController } from '../controllers/livroController';
import { ClienteController } from '../controllers/clienteController';
import { EmprestimoController } from '../controllers/emprestimoController';
/**
 * Interface de navegação via terminal CLI para a Livraria.
 */
export declare class MainMenu {
    private autorCtrl;
    private livroCtrl;
    private clienteCtrl;
    private emprestimoCtrl;
    private rl;
    constructor(autorCtrl: AutorController, livroCtrl: LivroController, clienteCtrl: ClienteController, emprestimoCtrl: EmprestimoController);
    private pergunta;
    iniciar(): Promise<void>;
    private menuAutores;
    private menuLivros;
    private menuClientes;
    private menuEmprestimos;
}
//# sourceMappingURL=mainMenu.d.ts.map