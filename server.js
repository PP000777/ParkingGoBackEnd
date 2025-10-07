import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // ❌ errado se usar export nomeado
import { connectDB as testDB } from './config/db.js'; // ✅ export nomeado

import vagasRoutes from './routes/vagas.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Conectar ao banco
await testDB(); // testa a conexão com PostgreSQL

// Rotas
app.use('/vagas', vagasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
