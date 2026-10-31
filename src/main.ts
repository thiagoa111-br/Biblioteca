import { AutorRepository } from './repositories/autorRepository';
import { LivroRepository } from './repositories/LivroRepository';
import { ClienteRepository } from './repositories/clienteRepository';
import { EmprestimoRepository } from './repositories/EmprestimoRepository';

import { AutorService } from './services/autorService';
import { LivroService } from './services/livroService';
import { ClienteService } from './services/clienteService';
import { EmprestimoService } from './services/emprestimoService';

import { AutorController } from './controllers/autorController';
import { LivroController } from './controllers/livroController';
import { ClienteController } from './controllers/clienteController';
import { EmprestimoController } from './controllers/emprestimoController';

import { carregarDadosIniciais } from './data/seed';
import { MainMenu } from './menus/mainMenu';

async function bootstrap() {
  // 1. Instancia Repositórios
  const autorRepo = new AutorRepository();
  const livroRepo = new LivroRepository();
  const clienteRepo = new ClienteRepository();
  const emprestimoRepo = new EmprestimoRepository();

  // 2. Carrega Dados Iniciais (Seed)
  await carregarDadosIniciais(autorRepo, livroRepo, clienteRepo);

  // 3. Instancia Serviços
  const autorService = new AutorService(autorRepo, livroRepo);
  const livroService = new LivroService(livroRepo, autorRepo, emprestimoRepo);
  const clienteService = new ClienteService(clienteRepo, emprestimoRepo);
  const emprestimoService = new EmprestimoService(emprestimoRepo, livroRepo, clienteRepo);

  // 4. Instancia Controladores
  const autorCtrl = new AutorController(autorService);
  const livroCtrl = new LivroController(livroService);
  const clienteCtrl = new ClienteController(clienteService);
  const emprestimoCtrl = new EmprestimoController(emprestimoService);

  // 5. Inicia a Aplicação CLI
  const menu = new MainMenu(autorCtrl, livroCtrl, clienteCtrl, emprestimoCtrl);
  await menu.iniciar();
}

bootstrap().catch(err => console.error('Erro ao iniciar a aplicação:', err));