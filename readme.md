```markdown
# 🚗 ParkingGo! — Backend API

> **API RESTful** desenvolvida em **Node.js + Express + PostgreSQL (via Sequelize)** para o sistema de estacionamento inteligente **ParkingGo!**.  
> O backend gerencia **vagas, reservas e sensores**, com suporte a **autenticação futura via JWT** e integração com o **app mobile ParkingGo!**.

---

## 🧠 Visão Geral

O **ParkingGo!** é um sistema que moderniza estacionamentos, oferecendo **monitoramento em tempo real**, **reserva antecipada** e **gestão inteligente de vagas**.  
Este repositório contém o **backend** do projeto — responsável por:

- 📊 Gerenciar o banco de dados PostgreSQL (vagas e usuários);
- ⚙️ Expor endpoints REST para comunicação com o app e sensores;
- ⏱️ Aplicar regras de negócio como **tempo de reserva e status das vagas**;
- 🔒 (Em breve) Implementar autenticação JWT para planos Premium e Ultra Plus.

---

## 📁 Estrutura do Projeto

```

parkinggo-backend/
│
├── config/
│   └── db.js                # Conexão com o banco de dados (Sequelize)
│
├── controllers/
│   └── vagas.controller.js  # Controladores das rotas de vagas
│
├── models/
│   └── VagaModel.js         # Modelo Sequelize da tabela 'vagas'
│
├── routes/
│   └── vagas.routes.js      # Rotas da API
│
├── services/
│   └── vaga.service.js      # Lógica de negócio (reserva, sensores)
│
├── create_db.sql            # Script SQL de criação do banco
├── .env.example             # Modelo do arquivo de ambiente
├── server.js                # Ponto de entrada principal da API
├── package.json             # Configuração do projeto
└── README.md                # Este arquivo 😎

````

---

## ⚙️ Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|-------------|
| **Backend** | Node.js, Express.js |
| **Banco de Dados** | PostgreSQL |
| **ORM** | Sequelize |
| **Ambiente** | dotenv |
| **Dev Tools** | Nodemon |

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seuusuario/parkinggo-backend.git
cd parkinggo-backend
````

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, baseado no exemplo abaixo:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do PostgreSQL:

```ini
# --- Configurações do Servidor ---
PORT=3000
NODE_ENV=development

# --- Banco de Dados ---
DB_HOST=localhost
DB_PORT=5432
DB_NAME=parkinggodb
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

# --- Futuro: Autenticação JWT ---
JWT_SECRET=UM_SEGREDO_MUITO_FORTE_E_ALEATORIO_PARA_JWT
```

### 4️⃣ Criar o banco de dados

Abra o terminal `psql` (ou use pgAdmin) e execute o script SQL:

```bash
psql -U postgres -f create_db.sql
```

### 5️⃣ Rodar o servidor

Para iniciar em modo desenvolvimento (com auto-reload):

```bash
npm run dev
```

Ou modo produção:

```bash
npm start
```

Servidor disponível em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📡 Endpoints Principais

| Método | Rota                    | Descrição                                       |
| ------ | ----------------------- | ----------------------------------------------- |
| `GET`  | `/`                     | Health Check da API                             |
| `GET`  | `/api/vagas`            | Lista todas as vagas                            |
| `GET`  | `/api/vagas/resumo`     | Retorna o resumo de disponibilidade por setor   |
| `POST` | `/api/vagas/reservar`   | Realiza reserva de vaga (Plano Ultra Plus)      |
| `PUT`  | `/api/vagas/:id/status` | Atualiza status da vaga (integração com sensor) |

---

## 🧩 Regras de Negócio Implementadas

* ✅ Vagas só podem ser reservadas se estiverem **disponíveis**;
* ⏳ Reserva expira automaticamente após **15 minutos** se o motorista não ocupar;
* 🚦 Sensores atualizam o status da vaga via API (`/status`);
* 🔁 Caso uma vaga volte a ficar “Disponível”, a reserva é automaticamente **limpa**;
* 🧠 Estrutura pronta para autenticação de usuários via JWT.

---

## 🗃️ Banco de Dados

O projeto utiliza **PostgreSQL** com dois tipos de entidades principais:

* **vagas** → Gerencia número, setor, status, tipo, localização e reservas.
* **usuarios** → Contém nome, e-mail e plano do motorista (Gratuito, Premium, Ultra Plus).

> O script `create_db.sql` cria as tabelas, tipos ENUM e insere dados iniciais de teste.

---

## 🧰 Scripts Disponíveis

| Comando       | Descrição                        |
| ------------- | -------------------------------- |
| `npm start`   | Inicia o servidor normalmente    |
| `npm run dev` | Inicia com nodemon (auto reload) |
| `npm install` | Instala todas as dependências    |

---

## 🧑‍💻 Equipe ParkingGo!

| Nome              | Função                                 | Contato                                                         |
| ----------------- | -------------------------------------- | --------------------------------------------------------------- |
| Ruan              | Backend / Banco de Dados               | [ruan.premium@parkinggo.com](mailto:ruan.premium@parkinggo.com) |
| Pedro             | App Mobile / Frontend                  | [pedro.normal@parkinggo.com](mailto:pedro.normal@parkinggo.com) |
| Equipe ParkingGo! | 💙 Projeto Integrador SA Mobilidade 3B |                                                                 |

---

## 📄 Licença

Este projeto está sob a licença **ISC**.
Sinta-se livre para usar, modificar e contribuir!

---

## 🌟 Próximos Passos

* [ ] Implementar **JWT Authentication** para usuários e planos
* [ ] Criar **rotas seguras** (hardware/sensores autenticados)
* [ ] Integrar com o **ParkingGo! App Mobile (React Native/Expo)**
* [ ] Implantar em **Railway / Render / Vercel**

---

**🚀 API ParkingGo! — Conectando motoristas e vagas de forma inteligente.**

```
```
