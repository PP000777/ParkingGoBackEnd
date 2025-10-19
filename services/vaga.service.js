import Vaga from '../models/VagaModel.js';

const TEMPO_RESERVA_MINUTOS = 15; 


export const executarReserva = async (vagaId, usuarioId) => {
    const vaga = await Vaga.findByPk(vagaId);

    if (!vaga) {
        throw new Error('Vaga não encontrada.');
    }


    const isReservedAndActive = vaga.reservadaPorUsuarioId && vaga.expiraEm > new Date();


    if (vaga.status !== 'Disponível' || isReservedAndActive) {
        throw new Error('Vaga indisponível (ocupada ou já reservada por outro motorista).');
    }
    

    const expiraEm = new Date(Date.now() + TEMPO_RESERVA_MINUTOS * 60 * 1000);


    await vaga.update({
        status: 'Ocupada', 
        reservadaPorUsuarioId: usuarioId,
        expiraEm: expiraEm,
    });

    return vaga;
};

export const atualizarStatusELimparReserva = async (id, novoStatus) => {
    const vaga = await Vaga.findByPk(id);

    if (!vaga) {
        throw new Error('Vaga não encontrada.');
    }

    let updateData = { status: novoStatus };

    if (novoStatus === 'Disponível') {
         updateData.reservadaPorUsuarioId = null;
         updateData.expiraEm = null;
    }

    await vaga.update(updateData);
    return vaga;
};
