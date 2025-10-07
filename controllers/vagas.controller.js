import Vaga from '../models/VagaModel.js';
import { executarReserva, atualizarStatusELimparReserva } from '../services/vaga.service.js';
import { sequelize } from '../config/db.js';

/**
 * @desc    [GET] Lista todas as vagas e seus status (Mapa em tempo real).
 */
export const getTodasVagas = async (req, res) => {
    try {
        const vagas = await Vaga.findAll(); 
        res.status(200).json({ sucesso: true, total: vagas.length, data: vagas });
    } catch (error) {
        console.error("Erro ao buscar vagas:", error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao buscar vagas.' });
    }
};

/**
 * @desc    [GET] Exibe um resumo de disponibilidade por setor (Painel do Gestor).
 */
export const getResumoStatus = async (req, res) => {
    try {
        // Usa agregação SQL (SUM e COUNT) para calcular vagas disponíveis por setor
        const resumo = await Vaga.findAll({
            attributes: [
                'setor',
                [sequelize.fn('COUNT', sequelize.col('id')), 'totalVagas'],
                [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'Disponível' THEN 1 ELSE 0 END")), 'disponiveis'],
            ],
            group: ['setor']
        });
        res.status(200).json({ sucesso: true, data: resumo });
    } catch (error) {
        console.error("Erro ao buscar resumo:", error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao calcular resumo de vagas.' });
    }
};


/**
 * @desc    [POST] Permite reserva de vaga (Plano Ultra Plus).
 */
export const reservarVaga = async (req, res) => {
    const { vagaId, usuarioId } = req.body; 

    if (!vagaId || !usuarioId) {
        return res.status(400).json({ sucesso: false, mensagem: 'IDs da vaga e usuário são obrigatórios.' });
    }

    try {
        const vaga = await executarReserva(vagaId, usuarioId);

        res.status(200).json({ 
            sucesso: true, 
            data: vaga, 
            mensagem: `Vaga ${vaga.numero} reservada com sucesso! Você tem 15 minutos para ocupá-la.` 
        });

    } catch (error) {
        // 409: Conflito (Regra de negócio violada)
        const statusCode = error.message.includes('não encontrada') ? 404 : 409; 
        res.status(statusCode).json({ sucesso: false, mensagem: error.message });
    }
};

/**
 * @desc    [PUT] Atualiza o status da vaga (Integração Hardware/Sensor).
 */
export const atualizarStatusVaga = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    if (!['Disponível', 'Ocupada', 'Manutenção'].includes(status)) {
        return res.status(400).json({ sucesso: false, mensagem: 'Status inválido fornecido.' });
    }

    try {
        const vaga = await atualizarStatusELimparReserva(id, status);

        res.status(200).json({ 
            sucesso: true, 
            data: vaga, 
            mensagem: `Status da vaga ${vaga.numero} atualizado para ${status}.` 
        });

    } catch (error) {
        const statusCode = error.message.includes('não encontrada') ? 404 : 500;
        res.status(statusCode).json({ sucesso: false, mensagem: error.message });
    }
};