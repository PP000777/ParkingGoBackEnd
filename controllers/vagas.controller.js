// controllers/vagas.controller.js
import Vaga from '../models/VagaModel.js';

export const listarVagas = async (req, res) => {
  try {
    const vagas = await Vaga.findAll();
    res.json(vagas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar vagas' });
  }
};

export const atualizarStatusVaga = async (req, res) => {
  try {
    const { id, status } = req.body;
    const vaga = await Vaga.findByPk(id);
    if (!vaga) return res.status(404).json({ error: 'Vaga não encontrada' });
    vaga.status = status;
    await vaga.save();
    res.json(vaga);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar vaga' });
  }
};
