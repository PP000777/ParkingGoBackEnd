import express from 'express';
import { listarVagas, atualizarStatusVaga } from '../controllers/vagas.controller.js';

const router = express.Router();

router.get('/', listarVagas);
router.put('/status', atualizarStatusVaga);

export default router;
