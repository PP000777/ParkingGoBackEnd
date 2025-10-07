// config/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Cria a instância do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// Função para testar a conexão
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
    process.exit(1); // encerra o processo em caso de falha
  }
};

// Exporta também o sequelize (para usar nos models)
export default sequelize;
