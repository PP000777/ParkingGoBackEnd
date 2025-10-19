// models/Vaga.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Vaga = sequelize.define('Vaga', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    setor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        // Mapeia o ENUM 'vaga_status'
        type: DataTypes.ENUM('Disponível', 'Ocupada', 'Manutenção'),
        allowNull: false,
        defaultValue: 'Disponível'
    },
    tipo: {
        // Mapeia o ENUM 'vaga_tipo'
        type: DataTypes.ENUM('Normal', 'PCD', 'Idoso', 'ReservaExclusiva'),
        allowNull: false,
        defaultValue: 'Normal'
    },
    reservada_por_usuario_id: {
        type: DataTypes.STRING(50)
    },
    expira_em: {
        type: DataTypes.DATE
    },
    latitude: {
        type: DataTypes.DOUBLE
    },
    longitude: {
        type: DataTypes.DOUBLE
    }
}, {
    tableName: 'vagas', 
    timestamps: true,
});


export default Vaga;