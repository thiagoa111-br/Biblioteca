import { AutorRepository } from '../repositories/autorRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/clienteRepository';

/**
 * Função responsável por carregar dados iniciais de exemplo na memória da aplicação.
 */
export async function carregarDadosIniciais(
  autorRepo: AutorRepository,
  livroRepo: LivroRepository,
  clienteRepo: ClienteRepository
): Promise<void> {
  // Cadastra Autores Iniciais
  const autor1 = await autorRepo.criar('Machado de Assis', 'Brasileira', '1839-06-21');
  const autor2 = await autorRepo.criar('Clarice Lispector', 'Brasileira', '1920-12-10');
  // Cadastra Livros Iniciais (vinculados aos IDs dos autores)
  await livroRepo.criar('Dom Casmurro', 1899, 5, autor1.id);
  await livroRepo.criar('Memórias Póstumas de Brás Cubas', 1881, 3, autor1.id);
  await livroRepo.criar('A Hora da Estrela', 1977, 4, autor2.id);

  // Cadastra Clientes Iniciais
  await clienteRepo.criar('Carlos Silva', 'carlos@email.com', '48999998888');
  await clienteRepo.criar('Ana Souza', 'ana@email.com', '48988887777');
}