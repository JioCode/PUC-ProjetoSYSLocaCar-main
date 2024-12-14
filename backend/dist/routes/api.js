"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Rota POST para salvar contratos
router.post('/contratos', (req, res) => {
    const contrato = req.body;
    console.log('Contrato recebido:', contrato);
    // Simulação de salvamento no banco
    res.status(201).json({
        message: 'Contrato salvo com sucesso!',
        contrato,
    });
});
// Rota GET para listar contratos
router.get('/contratos', (req, res) => {
    // Simulação de retorno de contratos
    res.json([
        {
            id: 1,
            dataLocacao: '2024-06-10',
            dataDevolucao: '2024-06-15',
            valorCaucao: 500,
            valorTotal: 1500,
            status: 'Ativo',
        },
    ]);
});
exports.default = router;
