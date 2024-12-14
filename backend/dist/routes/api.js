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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client"); // Certifique-se de que o prisma está corretamente importado
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// Rota POST para salvar contratos
router.post('/contratos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status } = req.body;
    try {
        // Criando o contrato no banco de dados
        const contrato = yield prisma.contratoLocacao.create({
            data: {
                dataLocacao: new Date(dataLocacao),
                dataDevolucao: new Date(dataDevolucao),
                valorCaucao,
                valorTotal,
                status,
            },
        });
        res.status(201).json({
            message: 'Contrato salvo com sucesso!',
            contrato,
        });
    }
    catch (error) {
        console.error("Erro ao salvar contrato", error);
        res.status(500).json({ message: 'Erro ao salvar contrato' });
    }
}));
// Rota GET para listar contratos
router.get('/contratos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscando todos os contratos no banco de dados
        const contratos = yield prisma.contratoLocacao.findMany();
        res.json(contratos);
    }
    catch (error) {
        console.error("Erro ao buscar contratos", error);
        res.status(500).json({ message: 'Erro ao buscar contratos' });
    }
}));
exports.default = router;
