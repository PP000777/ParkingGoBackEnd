// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; 
import vagasRoutes from './routes/vagas.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        await connectDB(); 

        app.use('/vagas', vagasRoutes);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

    } catch (error) {
        console.error('Falha Crítica ao iniciar o servidor:', error);
        process.exit(1);
    }
}

startServer();