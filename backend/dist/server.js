"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const contratoRoutes_1 = __importDefault(require("./routes/contratoRoutes"));
const routes_1 = __importDefault(require("./routes/routes")); // Importe suas rotas de cliente aqui
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use a rota para contrato e cliente
app.use("/api", contratoRoutes_1.default);
app.use("/cliente", routes_1.default); // Rota para o cliente
const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
