"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autorRepository_1 = require("./repositories/autorRepository");
const LivroRepository_1 = require("./repositories/LivroRepository");
const clienteRepository_1 = require("./repositories/clienteRepository");
const EmprestimoRepository_1 = require("./repositories/EmprestimoRepository");
const autorService_1 = require("./services/autorService");
const livroService_1 = require("./services/livroService");
const clienteService_1 = require("./services/clienteService");
const emprestimoService_1 = require("./services/emprestimoService");
const autorController_1 = require("./controllers/autorController");
const livroController_1 = require("./controllers/livroController");
const clienteController_1 = require("./controllers/clienteController");
const emprestimoController_1 = require("./controllers/emprestimoController");
const seed_1 = require("./data/seed");
const mainMenu_1 = require("./menus/mainMenu");
async function bootstrap() {
    // 1. Instancia Repositórios
    const autorRepo = new autorRepository_1.AutorRepository();
    const livroRepo = new LivroRepository_1.LivroRepository();
    const clienteRepo = new clienteRepository_1.ClienteRepository();
    const emprestimoRepo = new EmprestimoRepository_1.EmprestimoRepository();
    // 2. Carrega Dados Iniciais (Seed)
    await (0, seed_1.carregarDadosIniciais)(autorRepo, livroRepo, clienteRepo);
    // 3. Instancia Serviços
    const autorService = new autorService_1.AutorService(autorRepo);
    const livroService = new livroService_1.LivroService(livroRepo, autorRepo);
    const clienteService = new clienteService_1.ClienteService(clienteRepo);
    const emprestimoService = new emprestimoService_1.EmprestimoService(emprestimoRepo, livroRepo, clienteRepo);
    // 4. Instancia Controladores
    const autorCtrl = new autorController_1.AutorController(autorService);
    const livroCtrl = new livroController_1.LivroController(livroService);
    const clienteCtrl = new clienteController_1.ClienteController(clienteService);
    const emprestimoCtrl = new emprestimoController_1.EmprestimoController(emprestimoService);
    // 5. Inicia a Aplicação CLI
    const menu = new mainMenu_1.MainMenu(autorCtrl, livroCtrl, clienteCtrl, emprestimoCtrl);
    await menu.iniciar();
}
bootstrap().catch(err => console.error('Erro ao iniciar a aplicação:', err));
//# sourceMappingURL=main.js.map