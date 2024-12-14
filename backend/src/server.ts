import express, { Request, Response } from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';

const app = express();

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

// Rota padrão para checar status do servidor
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor rodando com sucesso!');
});

// Inicia o servidor na porta 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
