import express from "express";
import cors from "cors";
import contratoRoutes from "./routes/contratoRoutes";
import clienteRoutes from "./routes/routes"; // Importe suas rotas de cliente aqui

const app = express();
app.use(cors());
app.use(express.json());

// Use a rota para contrato e cliente
app.use("/api", contratoRoutes);
app.use("/cliente", clienteRoutes);  // Rota para o cliente

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
