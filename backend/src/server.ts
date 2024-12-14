import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import apiRoutes from './routes/api';

const app = express();
const prisma = new PrismaClient();

// Configuração do CORS
app.use(
    cors({
        origin: 'http://localhost:3000', // URL do frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        credentials: true, // Caso precise enviar cookies ou autenticação
    })
);

// Configuração do servidor
app.use(express.json()); // Permite o uso de JSON no corpo das requisições
app.use('/api', apiRoutes); // Rota base para as APIs

// Rota para criar um novo contrato
app.post('/api/contratos', async (req: Request, res: Response) => {
    const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status, clienteId, veiculos } = req.body;

    try {
        const contrato = await prisma.contratoLocacao.create({
            data: {
                dataLocacao,
                dataDevolucao,
                valorCaucao,
                valorTotal,
                status,
                clienteId,
                veiculos: {
                    connect: veiculos.map((id: number) => ({ id }))
                }
            }
        });
        res.status(201).json(contrato);
    } catch (error) {
        console.error('Erro ao criar contrato:', error);
        res.status(500).json({ error: 'Erro ao criar contrato' });
    }
});

// Rota para editar um contrato existente
app.put('/api/contratos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status, clienteId, veiculos } = req.body;

    try {
        const contrato = await prisma.contratoLocacao.update({
            where: { id: Number(id) },
            data: {
                dataLocacao,
                dataDevolucao,
                valorCaucao,
                valorTotal,
                status,
                clienteId,
                veiculos: {
                    set: veiculos.map((id: number) => ({ id }))
                }
            }
        });
        res.status(200).json(contrato);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar contrato' });
    }
});

// Rota para excluir um contrato
app.delete('/api/contratos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const contrato = await prisma.contratoLocacao.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({ message: 'Contrato excluído com sucesso', contrato });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Contrato não encontrado' });
    }
});

// Rota padrão para checar status do servidor
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor rodando com sucesso!');
});

// Inicia o servidor na porta 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
