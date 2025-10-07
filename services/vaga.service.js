import Vaga from '../models/VagaModel.js';

const TEMPO_RESERVA_MINUTOS = 15; // Regra de negócio: 15 minutos de tolerância

/**
 * @desc    Executa a lógica de reserva da vaga, validando status e aplicando tempo limite.
 */
export const executarReserva = async (vagaId, usuarioId) => {
    const vaga = await Vaga.findByPk(vagaId);

    if (!vaga) {
        throw new Error('Vaga não encontrada.');
    }

    // Validação de Expiração: Verifica se a reserva atual expirou
    const isReservedAndActive = vaga.reservadaPorUsuarioId && vaga.expiraEm > new Date();

    // Regra de Negócio Crítica: Vaga deve estar 'Disponível' e não ter reserva ativa
    if (vaga.status !== 'Disponível' || isReservedAndActive) {
        throw new Error('Vaga indisponível (ocupada ou já reservada por outro motorista).');
    }
    
    // Cálculo do tempo de expiração
    const expiraEm = new Date(Date.now() + TEMPO_RESERVA_MINUTOS * 60 * 1000);

    // Aplica a Reserva
    await vaga.update({
        status: 'Ocupada', // Marca como ocupada (reservada)
        reservadaPorUsuarioId: usuarioId,
        expiraEm: expiraEm,
    });

    return vaga;
};

/**
 * @desc    Atualiza o status da vaga, simulando a leitura do sensor/hardware.
 */
export const atualizarStatusELimparReserva = async (id, novoStatus) => {
    const vaga = await Vaga.findByPk(id);

    if (!vaga) {
        throw new Error('Vaga não encontrada.');
    }

    let updateData = { status: novoStatus };

    // Regra de Negócio: Se o sensor reporta 'Disponível', limpamos a reserva.
    if (novoStatus === 'Disponível') {
         updateData.reservadaPorUsuarioId = null;
         updateData.expiraEm = null;
    }

    await vaga.update(updateData);
    return vaga;
};