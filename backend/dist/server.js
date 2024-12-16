"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Configuração do CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Caso precise enviar cookies ou autenticação
}));
// Configuração do servidor
app.use(express_1.default.json()); // Permite o uso de JSON no corpo das requisições
app.use('/api', api_1.default); // Rota base para as APIs
// Rota para criar um novo contrato
app.post('/api/contratos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status, clienteId, veiculos } = req.body;
    try {
        const contrato = yield prisma.contratoLocacao.create({
            data: {
                dataLocacao,
                dataDevolucao,
                valorCaucao,
                valorTotal,
                status,
                clienteId,
                veiculos: {
                    connect: veiculos.map((id) => ({ id }))
                }
            }
        });
        res.status(201).json(contrato);
    }
    catch (error) {
        console.error('Erro ao criar contrato:', error);
        res.status(500).json({ error: 'Erro ao criar contrato' });
    }
}));
// Rota para editar um contrato existente
app.put('/api/contratos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status, clienteId, veiculos } = req.body;
    try {
        const contrato = yield prisma.contratoLocacao.update({
            where: { id: Number(id) },
            data: {
                dataLocacao,
                dataDevolucao,
                valorCaucao,
                valorTotal,
                status,
                clienteId,
                veiculos: {
                    set: veiculos.map((id) => ({ id }))
                }
            }
        });
        res.status(200).json(contrato);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar contrato' });
    }
}));
// Rota para excluir um contrato
app.delete('/api/contratos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Requisição para excluir contrato com ID: ${id}`);
    try {
        const contrato = yield prisma.contratoLocacao.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({ message: 'Contrato excluído com sucesso', contrato });
    }
    catch (error) {
        console.error("Erro ao excluir contrato:", error);
        res.status(404).json({ error: 'Contrato não encontrado' });
    }
}));
// Rota padrão para checar status do servidor
app.get('/', (req, res) => {
    res.send('Servidor rodando com sucesso!');
});
// Inicia o servidor na porta 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
