import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Define o modelo Vaga
const Vaga = sequelize.define('Vaga', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    numero: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    setor: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // O tipo ENUM será inferido do banco de dados
    status: { 
        type: DataTypes.ENUM('Disponível', 'Ocupada', 'Manutenção'), 
        defaultValue: 'Disponível' 
    },
    tipo: { 
        type: DataTypes.ENUM('Normal', 'PCD', 'Idoso', 'ReservaExclusiva'), 
        defaultValue: 'Normal' 
    },
    
    // Mapeamento para snake_case no banco de dados (reservada_por_usuario_id)
    reservadaPorUsuarioId: { 
        type: DataTypes.STRING, 
        defaultValue: null, 
        field: 'reservada_por_usuario_id' 
    },
    expiraEm: { 
        type: DataTypes.DATE, 
        defaultValue: null, 
        field: 'expira_em' 
    },
    
    latitude: { type: DataTypes.FLOAT, defaultValue: null },
    longitude: { type: DataTypes.FLOAT, defaultValue: null }
}, {
    tableName: 'vagas', // Nome da tabela no PostgreSQL
    timestamps: true,   // Ativa createdAt e updatedAt
    modelName: 'Vaga' 
});

export default Vaga;