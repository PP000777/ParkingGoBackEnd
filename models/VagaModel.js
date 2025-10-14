import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Vaga = sequelize.define('Vaga', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'vagas',
});

export default Vaga;
