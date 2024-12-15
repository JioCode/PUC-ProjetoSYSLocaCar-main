// Definição da interface ContratoBody
export interface ContratoBody {
    dataLocacao: string;
    dataDevolucao: string;
    valorCaucao: number;
    valorTotal: number;
    status: string;
    clienteId: number;
    veiculos: number[];  // Array de IDs dos veículos
}
