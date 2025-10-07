import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import vagasRoutes from './routes/vagas.routes.js';
import Vaga from './models/VagaModel.js'; // Garante que o modelo seja carregado

// Carrega variáveis de ambiente
dotenv.config();

// Conecta ao banco de dados PostgreSQL (termina a aplicação em caso de erro)
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Permite ler o corpo das requisições como JSON

// Rota principal (Health Check)
app.get('/', (req, res) => {
    res.send('API ParkingGo! Rodando e conectada ao PostgreSQL. Versão 1.0.');
});

// Monta as rotas da API no caminho base /api/vagas
app.use('/api/vagas', vagasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[Server] Servidor rodando no ambiente ${process.env.NODE_ENV} na porta ${PORT}`);
    console.log(`[Server] Acesse: http://localhost:${PORT}`);
});