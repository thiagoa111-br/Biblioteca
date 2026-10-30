export interface ICliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}
export class Cliente implements ICliente {
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public telefone: string
  ) {} 
}