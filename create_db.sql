-- SA-Mobilidade-3B-backend: Script SQL para PostgreSQL

-- 1. Criação dos Tipos ENUM para garantir consistência e validação
DO $$ BEGIN
    -- Tipos de Status da Vaga (essencial para tempo real)
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'vaga_status') THEN
        CREATE TYPE vaga_status AS ENUM ('Disponível', 'Ocupada', 'Manutenção');
    END IF;
    -- Tipos de Classificação da Vaga (Normal, PCD, Reserva, etc.)
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'vaga_tipo') THEN
        CREATE TYPE vaga_tipo AS ENUM ('Normal', 'PCD', 'Idoso', 'ReservaExclusiva');
    END IF;
END $$;

-- 2. Criação da Tabela VAGAS
CREATE TABLE IF NOT EXISTS vagas (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(10) UNIQUE NOT NULL, -- Ex: A1
    setor VARCHAR(50) NOT NULL,
    status vaga_status NOT NULL DEFAULT 'Disponível',
    tipo vaga_tipo NOT NULL DEFAULT 'Normal',
    
    -- Campos de Reserva (Plano Ultra Plus)
    reservada_por_usuario_id VARCHAR(50), 
    expira_em TIMESTAMP WITHOUT TIME ZONE,
    
    -- Localização para o mapa do App Mobile
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,

    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 3. Scripts de Inserção de Dados (para testes)
INSERT INTO vagas (numero, setor, status, tipo, latitude, longitude) VALUES
('T01', 'Térreo', 'Disponível', 'ReservaExclusiva', -27.5936, -48.5583),
('T02', 'Térreo', 'Ocupada', 'Normal', -27.5937, -48.5582),
('T03', 'Térreo', 'Disponível', 'Normal', -27.5938, -48.5581),
('S01', 'Subsolo', 'Disponível', 'PCD', -27.5939, -48.5580),
('S02', 'Subsolo', 'Ocupada', 'Normal', -27.5940, -48.5579);

-- 4. Criação de Tabela de Usuários (necessária para futura autenticação/reserva)
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(50) PRIMARY KEY, -- ID simulado (vindo do Firebase Auth/JWT)
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    plano VARCHAR(20) NOT NULL DEFAULT 'Gratuito' -- Ex: Gratuito, Premium, Ultra Plus
);

INSERT INTO usuarios (id, nome, email, plano) VALUES
('uid_premium_1', 'Ruan Motorista Premium', 'ruan.premium@parkinggo.com', 'Ultra Plus'),
('uid_normal_2', 'Pedro Motorista', 'pedro.normal@parkinggo.com', 'Gratuito');