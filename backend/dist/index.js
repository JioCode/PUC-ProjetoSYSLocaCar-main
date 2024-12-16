"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./router/routes"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORTA = process.env.PORT;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.listen(PORTA, () => {
    console.log(`Servidor executando na porta: ${PORTA}`);
});
