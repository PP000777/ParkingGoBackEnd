import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Vaga = sequelize.define('Vaga', {
  // Ajuste para mapear a chave primária 'id_vaga'
  id: {
    type: DataTypes.INTEGER, // Ajuste o tipo se for diferente (ex: UUID)
    primaryKey: true,
    autoIncrement: true, 
    field: 'id_vaga', // Mapeia o atributo 'id' da Model para a coluna 'id_vaga' do DB
  },
  // Atenção: Seu serviço espera strings ('Disponível', 'Ocupada'). Mude para STRING se necessário.
  status: { 
    type: DataTypes.STRING, // Alterei para STRING, pois o service usa 'Disponível' e 'Ocupada'
    defaultValue: 'Disponível',
  }
}, {
  tableName: 'vagas',
  // SOLUÇÃO PARA O ERRO 'coluna "createdAt" não existe':
  timestamps: false, 
});

export default Vaga;