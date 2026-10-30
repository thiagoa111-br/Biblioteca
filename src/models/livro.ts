export interface ILivro {
    id: number;
    titulo: string;
    autorId: number;
    anoPublicacao: number;
    quantidadeDisponivel: number;
}
  export class Livro implements ILivro {
    constructor(
      public id: number,
      public titulo: string,
      public autorId: number,
      public anoPublicacao: number,
      public quantidadeDisponivel: number
    ) {}
}