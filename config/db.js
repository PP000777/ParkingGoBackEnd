// config/db.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; // 1. Importa o dotenv
dotenv.config();            // 2. Chama a configuração AQUI!

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT; // <-- Agora, garantidamente 'postgres'
const DB_PORT = process.env.DB_PORT;

// Linha 11: Cria a instância do Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT, // Aqui o valor 'postgres' é passado.
  logging: false
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o PostgreSQL estabelecida com sucesso.');
  } catch (error) {
    // Se ainda falhar, agora será um erro de credencial/conexão real, não de Dialect.
    console.error('❌ Não foi possível conectar ao banco de dados. Verifique o .env e se o PostgreSQL está rodando:', error.message);
    process.exit(1); 
  }
};

export default sequelize;