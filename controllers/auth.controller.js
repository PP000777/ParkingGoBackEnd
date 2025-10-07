// controllers/auth.controller.js
import Usuario from '../models/UsuarioModel.js';
import { v4 as uuidv4 } from 'uuid'; // Biblioteca para gerar IDs únicos (simulando Firebase ID)

/**
 * @desc    [POST] Registra um novo usuário no sistema.
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registrarUsuario = async (req, res) => {
    const { nome, email, senha, plano } = req.body;

    // 1. Validação básica de entrada
    if (!nome || !email || !senha) {
        return res.status(400).json({ sucesso: false, mensagem: 'Por favor, preencha todos os campos obrigatórios (nome, email, senha).' });
    }

    try {
        // 2. Verifica se o usuário já existe
        const usuarioExiste = await Usuario.findOne({ where: { email } });
        
        if (usuarioExiste) {
            return res.status(400).json({ sucesso: false, mensagem: 'Usuário já registrado com este e-mail.' });
        }

        // 3. Cria um ID único (simulando ID de autenticação)
        const novoId = uuidv4(); 

        // 4. Cria o usuário. O hook 'beforeCreate' no modelo criptografa a senha!
        const usuario = await Usuario.create({
            id: novoId,
            nome,
            email,
            senha, // A senha será hasheada antes de ir para o DB
            plano: plano || 'Gratuito' // Define plano padrão se não for fornecido
        });

        if (usuario) {
            res.status(201).json({
                sucesso: true,
                mensagem: 'Registro efetuado com sucesso!',
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    plano: usuario.plano,
                    // Gera o token JWT para o login automático após o registro
                    token: usuario.gerarToken() 
                },
            });
        } else {
            res.status(400).json({ sucesso: false, mensagem: 'Dados de usuário inválidos.' });
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor ao registrar usuário.' });
    }
};

/**
 * @desc    [POST] Autentica o usuário e retorna o token JWT.
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ sucesso: false, mensagem: 'Por favor, forneça e-mail e senha.' });
    }

    try {
        // 1. Busca o usuário pelo email
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas.' });
        }

        // 2. Compara a senha digitada com o hash no DB
        const senhaCorreta = await usuario.compararSenha(senha);

        if (usuario && senhaCorreta) {
            res.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso!',
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    plano: usuario.plano,
                    token: usuario.gerarToken()
                },
            });
        } else {
            // Se o usuário existe mas a senha está errada
            res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas.' });
        }
    } catch (error) {
        console.error('Erro no login:', error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor ao logar.' });
    }
};
