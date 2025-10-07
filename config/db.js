import { Sequelize } from 'sequelize';

// Cria a instância do Sequelize a partir das variáveis .env
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        // Loga queries SQL apenas em desenvolvimento
        logging: process.env.NODE_ENV === 'development' ? console.log : false 
    }
);

/**
 * Tenta autenticar a conexão e sincroniza os modelos com o PostgreSQL.
 */
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`[DB] Conexão com PostgreSQL estabelecida com sucesso.`);
        
        // Sincroniza os modelos (cria as tabelas se não existirem). 
        await sequelize.sync({ force: false }); 
        console.log(`[DB] Modelos sincronizados com o banco de dados.`);
    } catch (error) {
        console.error(`[DB ERROR] Falha na conexão/sincronização do PostgreSQL: ${error.message}`);
        // Termina o processo se falhar a conexão
        process.exit(1); 
    }
};

export { sequelize, connectDB };