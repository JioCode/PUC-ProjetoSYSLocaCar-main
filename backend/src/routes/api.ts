import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; // Certifique-se de que o prisma está corretamente importado
const prisma = new PrismaClient();
const router = Router();

// Rota POST para salvar contratos
router.post('/contratos', async (req: Request, res: Response) => {
    const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status } = req.body;

    try {
        // Criando o contrato no banco de dados
        const contrato = await prisma.contratoLocacao.create({
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
    } catch (error) {
        console.error("Erro ao salvar contrato", error);
        res.status(500).json({ message: 'Erro ao salvar contrato' });
    }
});

// Rota GET para listar contratos
router.get('/contratos', async (req: Request, res: Response) => {
    try {
        // Buscando todos os contratos no banco de dados
        const contratos = await prisma.contratoLocacao.findMany();
        res.json(contratos);
    } catch (error) {
        console.error("Erro ao buscar contratos", error);
        res.status(500).json({ message: 'Erro ao buscar contratos' });
    }
});

router.delete('/contratos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      await prisma.contratoLocacao.delete({
          where: { id: Number(id) }, // Certifique-se de converter o ID para número
      });
      res.status(200).json({ message: 'Contrato excluído com sucesso.' });
  } catch (error) {
      console.error("Erro ao excluir contrato", error);
      res.status(500).json({ message: 'Erro ao excluir contrato.' });
  }
});

export default router;
