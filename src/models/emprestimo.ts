export interface IEmprestimo {
    id: number;
    livroId: number;
    clienteId: number;
    dataEmprestimo: string;
    dataDevolucao?: string;
    status: 'ativo' | 'devolvido';
}

export class Emprestimo implements IEmprestimo {
    public dataDevolucao?: string;

    constructor(
        public id: number,
        public livroId: number,
        public clienteId: number,
        public dataEmprestimo: string,
        dataDevolucao: string | undefined,
        public status: 'ativo' | 'devolvido'
    ) {
        if (dataDevolucao !== undefined) {
            this.dataDevolucao = dataDevolucao;
        }
    }
}