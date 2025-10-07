// models/VagaModel.js
import sequelize from '../config/db.js'; // ✅ sem chaves
import { DataTypes } from 'sequelize';

const Vaga = sequelize.define('Vaga', {
  numero_vaga: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_vaga: {
    type: DataTypes.ENUM('normal', 'PCD', 'elétrica'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('livre', 'ocupada', 'reservada'),
    allowNull: false,
    defaultValue: 'livre'
  }
});

export default Vaga;
