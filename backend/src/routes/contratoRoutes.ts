import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/contratos", async (req, res) => {
    const contratos = await prisma.contratoLocacao.findMany({
        include: { veiculos: true, ocorrencias: true, pagamentos: true },
    });
    res.json(contratos);
});



export default router;
