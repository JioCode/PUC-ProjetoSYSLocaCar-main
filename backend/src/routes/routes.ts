import { Router } from 'express';
import { create, researchId, researchAll, update, deleted } from '../controllers/clienteController';

const router = Router();

// Função assíncrona que recebe as promessas corretamente
router.post('/cliente', async (request, response) => {
    await create(request, response);
});

router.get('/cliente', async (request, response) => {
    await researchAll(request, response);
});

router.get('/cliente/:email', async (request, response) => {
    await researchId(request, response);
});

router.put('/cliente/:id', async (request, response) => {
    await update(request, response);
});

router.delete('/cliente/:id', async (request, response) => {
    await deleted(request, response);
});

export default router;
