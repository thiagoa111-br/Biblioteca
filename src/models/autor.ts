export interface IAutor {
  id: number;
  nome: string;
  nacionalidade: string;
  dataNascimento: string;
}

export class Autor implements IAutor {
  constructor(
    public id: number,
    public nome: string,
    public nacionalidade: string,
    public dataNascimento: string
  ) {}
}