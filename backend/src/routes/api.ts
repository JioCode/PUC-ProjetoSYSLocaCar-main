import { Router, Request, Response } from 'express';

const router = Router();

// Rota POST para salvar contratos
router.post('/contratos', (req: Request, res: Response) => {
    const contrato = req.body;
    console.log('Contrato recebido:', contrato);

  // Simulação de salvamento no banco
    res.status(201).json({
        message: 'Contrato salvo com sucesso!',
        contrato,
    });
});

// Rota GET para listar contratos
router.get('/contratos', (req: Request, res: Response) => {
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

export default router;
