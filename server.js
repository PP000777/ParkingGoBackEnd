// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // ✅ APENAS export nomeado
import vagasRoutes from './routes/vagas.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Testa conexão com banco PostgreSQL
await connectDB();

// Rotas
app.use('/vagas', vagasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
