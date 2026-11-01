const assert = require('node:assert/strict');
const test = require('node:test');

const { AutorRepository } = require('../dist/repositories/autorRepository');
const { LivroRepository } = require('../dist/repositories/LivroRepository');
const { ClienteRepository } = require('../dist/repositories/clienteRepository');
const { EmprestimoRepository } = require('../dist/repositories/EmprestimoRepository');
const { AutorService } = require('../dist/services/autorService');
const { LivroService } = require('../dist/services/livroService');
const { ClienteService } = require('../dist/services/clienteService');
const { EmprestimoService } = require('../dist/services/emprestimoService');

function criarSistema() {
  const autorRepo = new AutorRepository();
  const livroRepo = new LivroRepository();
  const clienteRepo = new ClienteRepository();
  const emprestimoRepo = new EmprestimoRepository();

  return {
    autorRepo,
    livroRepo,
    clienteRepo,
    emprestimoRepo,
    autorService: new AutorService(autorRepo, livroRepo),
    livroService: new LivroService(livroRepo, autorRepo, emprestimoRepo),
    clienteService: new ClienteService(clienteRepo, emprestimoRepo),
    emprestimoService: new EmprestimoService(emprestimoRepo, livroRepo, clienteRepo)
  };
}

async function criarAutorELivro(sistema, quantidadeDisponivel = 2) {
  const autor = await sistema.autorService.criarAutor(
    'Machado de Assis',
    'Brasileira',
    '1839-06-21'
  );
  const livro = await sistema.livroService.criarLivro(
    'Dom Casmurro',
    1899,
    quantidadeDisponivel,
    autor.id
  );
  return { autor, livro };
}

async function criarCliente(sistema) {
  return sistema.clienteService.criarCliente(
    'Carlos Silva',
    'carlos@example.com',
    '48999998888'
  );
}

test('autores podem ser criados, consultados, atualizados e removidos', async () => {
  const sistema = criarSistema();
  const autor = await sistema.autorService.criarAutor(
    'Machado de Assis',
    'Brasileira',
    '1839-06-21'
  );

  assert.equal((await sistema.autorService.buscarPorId(autor.id)).nome, 'Machado de Assis');
  assert.equal(
    (await sistema.autorService.atualizarAutor(autor.id, { nome: 'Machado atualizado' })).nome,
    'Machado atualizado'
  );
  assert.equal(await sistema.autorService.removerAutor(autor.id), true);
  await assert.rejects(sistema.autorService.buscarPorId(autor.id), /Autor não encontrado/);
});

test('autores com livros não podem ser removidos', async () => {
  const sistema = criarSistema();
  const { autor } = await criarAutorELivro(sistema);

  await assert.rejects(
    sistema.autorService.removerAutor(autor.id),
    /possui livros cadastrados/
  );
});

test('livros validam autor e estoque, e suportam consulta, atualização e remoção', async () => {
  const sistema = criarSistema();
  const autor = await sistema.autorService.criarAutor(
    'Clarice Lispector',
    'Brasileira',
    '1920-12-10'
  );

  await assert.rejects(
    sistema.livroService.criarLivro('Livro inválido', 2000, 1, 999),
    /autor informado não existe/
  );
  await assert.rejects(
    sistema.livroService.criarLivro('Livro inválido', 2000, -1, autor.id),
    /quantidade disponível/
  );

  const livro = await sistema.livroService.criarLivro('A Hora da Estrela', 1977, 4, autor.id);
  assert.equal((await sistema.livroService.buscarPorId(livro.id)).titulo, 'A Hora da Estrela');
  assert.equal(
    (await sistema.livroService.atualizarLivro(livro.id, { titulo: 'Título atualizado' })).titulo,
    'Título atualizado'
  );
  assert.equal(await sistema.livroService.removerLivro(livro.id), true);
  await assert.rejects(sistema.livroService.buscarPorId(livro.id), /Livro não encontrado/);
});

test('livros com empréstimos registrados não podem ser removidos', async () => {
  const sistema = criarSistema();
  const { livro } = await criarAutorELivro(sistema);
  const cliente = await criarCliente(sistema);

  await sistema.emprestimoService.realizarEmprestimo(livro.id, cliente.id, '2026-10-30');

  await assert.rejects(
    sistema.livroService.removerLivro(livro.id),
    /empréstimos registrados/
  );
});

test('clientes podem ser criados, consultados, atualizados e removidos', async () => {
  const sistema = criarSistema();
  const cliente = await criarCliente(sistema);

  assert.equal((await sistema.clienteService.buscarPorId(cliente.id)).nome, 'Carlos Silva');
  assert.equal(
    (await sistema.clienteService.atualizarCliente(cliente.id, { nome: 'Carlos atualizado' })).nome,
    'Carlos atualizado'
  );
  assert.equal(await sistema.clienteService.removerCliente(cliente.id), true);
  await assert.rejects(sistema.clienteService.buscarPorId(cliente.id), /Cliente não encontrado/);
});

test('clientes com empréstimos registrados não podem ser removidos', async () => {
  const sistema = criarSistema();
  const { livro } = await criarAutorELivro(sistema);
  const cliente = await criarCliente(sistema);

  await sistema.emprestimoService.realizarEmprestimo(livro.id, cliente.id, '2026-10-30');

  await assert.rejects(
    sistema.clienteService.removerCliente(cliente.id),
    /empréstimos registrados/
  );
});

test('empréstimo reduz estoque e consultas mostram livro e cliente', async () => {
  const sistema = criarSistema();
  const { livro } = await criarAutorELivro(sistema, 2);
  const cliente = await criarCliente(sistema);

  const emprestimo = await sistema.emprestimoService.realizarEmprestimo(
    livro.id,
    cliente.id,
    '2026-10-30'
  );

  assert.equal(emprestimo.status, 'ativo');
  assert.equal(livro.quantidadeDisponivel, 1);
  assert.deepEqual(await sistema.emprestimoService.consultarEmprestimoPorId(emprestimo.id), {
    emprestimo,
    livroTitulo: 'Dom Casmurro',
    clienteNome: 'Carlos Silva'
  });
  assert.equal((await sistema.emprestimoService.listarEmprestimosDetalhados()).length, 1);
});

test('empréstimos rejeitam referências inexistentes e livros sem estoque', async () => {
  const sistema = criarSistema();
  const { livro } = await criarAutorELivro(sistema, 0);
  const cliente = await criarCliente(sistema);

  await assert.rejects(
    sistema.emprestimoService.realizarEmprestimo(999, cliente.id, '2026-10-30'),
    /Livro não encontrado/
  );
  await assert.rejects(
    sistema.emprestimoService.realizarEmprestimo(livro.id, 999, '2026-10-30'),
    /Cliente não encontrado/
  );
  await assert.rejects(
    sistema.emprestimoService.realizarEmprestimo(livro.id, cliente.id, '2026-10-30'),
    /Não há exemplares disponíveis/
  );
  assert.equal(livro.quantidadeDisponivel, 0);
  assert.equal((await sistema.emprestimoService.listarEmprestimos()).length, 0);
});

test('devolução atualiza o status, registra a data e repõe o estoque uma única vez', async () => {
  const sistema = criarSistema();
  const { livro } = await criarAutorELivro(sistema, 1);
  const cliente = await criarCliente(sistema);
  const emprestimo = await sistema.emprestimoService.realizarEmprestimo(
    livro.id,
    cliente.id,
    '2026-10-30'
  );

  const devolvido = await sistema.emprestimoService.registrarDevolucao(
    emprestimo.id,
    '2026-10-31'
  );

  assert.equal(devolvido.status, 'devolvido');
  assert.equal(devolvido.dataDevolucao, '2026-10-31');
  assert.equal(livro.quantidadeDisponivel, 1);
  await assert.rejects(
    sistema.emprestimoService.registrarDevolucao(emprestimo.id, '2026-10-31'),
    /já foi devolvido/
  );
  assert.equal(livro.quantidadeDisponivel, 1);
});

test('consulta e devolução de empréstimo inexistente retornam erro', async () => {
  const sistema = criarSistema();

  await assert.rejects(
    sistema.emprestimoService.consultarEmprestimoPorId(999),
    /Registo de empréstimo não encontrado/
  );
  await assert.rejects(
    sistema.emprestimoService.registrarDevolucao(999, '2026-10-31'),
    /Registo de empréstimo não encontrado/
  );
});
