"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
// Configuração do CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001', // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Caso precise enviar cookies ou autenticação
}));
// Configuração do servidor
app.use(express_1.default.json()); // Permite o uso de JSON no corpo das requisições
app.use('/api', api_1.default); // Rota base para as APIs
// Rota padrão para checar status do servidor
app.get('/', (req, res) => {
    res.send('Servidor rodando com sucesso!');
});
// Inicia o servidor na porta 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
