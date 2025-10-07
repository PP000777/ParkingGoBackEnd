import express from 'express';
import { 
    getTodasVagas, 
    getResumoStatus,
    atualizarStatusVaga,
    reservarVaga 
} from '../controllers/vagas.controller.js';

const router = express.Router();

// Rotas de Consulta (abertas)
router.get('/', getTodasVagas); 
router.get('/resumo', getResumoStatus); 

// Rota de Reserva (Motorista Ultra Plus)
router.post('/reservar', reservarVaga); 

// Rota de Integração (Hardware/Sensor)
// FUTURO: Deve ser protegida por um middleware de autenticação!
router.put('/:id/status', atualizarStatusVaga); 

export default router;