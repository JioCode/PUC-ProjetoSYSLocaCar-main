const cors = require('cors');
const express = require('express');
const app = express();

// Configure o CORS para permitir o acesso da origem do frontend
app.use(cors({
    origin: 'http://localhost:3001', // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Caso precise enviar cookies ou autenticação
}));

// Restante da configuração do servidor
app.use(express.json());
app.use('/api', require('./routes/api'));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
