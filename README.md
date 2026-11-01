# BookStore Manager CLI

Aplicação de terminal para gerenciamento de autores, livros, clientes e empréstimos de uma livraria, desenvolvida como projeto final do módulo de Back End com Node.js e TypeScript.

## Objetivo

Praticar programação orientada a objetos, tipagem estática, programação assíncrona e organização de código em camadas. O projeto também inclui um modelo relacional e um script SQL para PostgreSQL.

> A aplicação CLI mantém os dados em memória durante a execução e não se conecta ao PostgreSQL. O banco de dados é uma entrega independente do programa.

## Tecnologias

- Node.js
- TypeScript
- PostgreSQL
- Test runner nativo do Node.js (`node:test`)

## Requisitos

- Node.js instalado (o projeto foi verificado com Node.js 24).
- npm, incluído na instalação do Node.js.
- PostgreSQL e pgAdmin, caso queira executar o script SQL.

## Instalação e execução

Na raiz do projeto, instale as dependências:

```powershell
npm.cmd install
```

Para compilar e iniciar o CLI:

```powershell
npm.cmd run dev
```

Também é possível compilar e iniciar em comandos separados:

```powershell
npm.cmd run build
npm.cmd start
```

A compilação gera os arquivos JavaScript em `dist/`; o código-fonte TypeScript permanece em `src/`.

O menu oferece operações para autores, livros e clientes, além de operações de empréstimo e devolução. Escolha uma opção digitando o número correspondente no terminal e use `0` para voltar ou encerrar, conforme o menu apresentado.

## Testes

Execute os testes automatizados com:

```powershell
npm.cmd test
```

O comando compila o projeto e executa os testes dos serviços. Os testes cobrem operações CRUD, validações de empréstimos, estoque, devoluções e proteção contra remoção de registros relacionados.

## Banco de dados PostgreSQL

O esquema, os dados de exemplo e os relatórios estão em [`database/script.sql`](database/script.sql). O diagrama entidade-relacionamento está em [`database/DER.png`](database/DER.png).

Para criar e preparar o banco pelo pgAdmin:

1. Conecte-se ao servidor PostgreSQL e abra o Query Tool no banco `postgres`.
2. Crie o banco do projeto, executando este comando sozinho:

   ```sql
   CREATE DATABASE biblioteca;
   ```

3. Atualize a lista de bancos e abra um Query Tool conectado a `biblioteca`.
4. Abra e execute o conteúdo completo de `database/script.sql`.
5. Consulte a saída das instruções `SELECT` na área **Data Output** do pgAdmin.

O script cria as tabelas `autores`, `livros`, `clientes` e `emprestimos`, insere os dados de exemplo e contém demonstrações de `UPDATE`, `DELETE` e consultas relacionais. As operações de demonstração são revertidas para não deixar alterações nos dados. A tabela de empréstimos começa sem registros, pois o seed da aplicação não cria empréstimos.

O script pode ser executado novamente no mesmo banco: as tabelas usam `IF NOT EXISTS`, os exemplos verificam registros existentes antes de inserir e a atualização de compatibilidade trata a coluna `telefone` de clientes existentes.

## Arquitetura e estrutura

```text
src/
  controllers/   Entrada e saída das operações do terminal
  data/          Dados iniciais da aplicação
  menus/         Navegação interativa da CLI
  models/        Classes e interfaces das entidades
  repositories/  Armazenamento em memória e operações de dados
  services/      Regras de negócio e validações
  main.ts        Inicialização e ligação das camadas
database/
  DER.png        Diagrama entidade-relacionamento
  script.sql     Estrutura, dados e relatórios SQL
tests/
  services.test.cjs
```

## Funcionalidades

- Cadastro, listagem, consulta por ID, atualização e remoção de autores, livros e clientes.
- Validação de referências entre autores e livros.
- Bloqueio da remoção de autores com livros e de livros ou clientes com empréstimos registrados.
- Realização e consulta de empréstimos, respeitando a existência do livro e do cliente e a disponibilidade em estoque.
- Registro de devolução e reposição do estoque.
- Relatórios SQL para livros disponíveis, livros emprestados, livros por autor, empréstimos por livro, clientes com empréstimos ativos e histórico detalhado.

Como a aplicação guarda os dados em memória, alterações feitas no CLI são perdidas quando o processo é encerrado. Os dados cadastrados diretamente no PostgreSQL não são compartilhados com a aplicação.

## Demonstração em vídeo

O vídeo de demonstração deve apresentar a inicialização do sistema, algumas operações da CLI, a execução dos testes e os entregáveis do banco de dados (DER e script SQL).

## Informações da equipe

- Integrante: Thiago Afonso