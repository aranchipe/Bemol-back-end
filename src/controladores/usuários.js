const securePassword = require('secure-password');
const knex = require('../bancoDeDados/conexao');
const pwd = securePassword();
const { schemaCadastroUsuario } = require('../validacoes/schemaCadastroUsuario')
const { schemaLogin } = require('../validacoes/schemaLogin')
const jwt = require('jsonwebtoken');


const cadastroDeUsuario = async (req, res) => {
    const {
        nome,
        email,
        cpf,
        telefone,
        cep,
        rua,
        bairro,
        cidade,
        estado,
        complemento,
        senha
    } = req.body;

    try {
        await schemaCadastroUsuario.validate(req.body);

        const emailEncontrado = await knex('usuarios')
            .where({ email });

        if (emailEncontrado.length > 0) {
            return res.status(400).json({ "mensagem": "email já cadastrado" });
        }

        const cpfEncontrado = await knex('usuarios')
            .where({ cpf });

        if (cpfEncontrado.length > 0) {
            return res.status(400).json({ "mensagem": "cpf já cadastrado" });
        }

        const telefoneEncontrado = await knex('usuarios')
            .where({ telefone });

        if (telefoneEncontrado.length > 0) {
            return res.status(400).json({ "mensagem": "Telefone já cadastrado" });
        }

        const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
        const usuarioCadastrado = await knex('usuarios').insert({
            nome,
            email,
            cpf,
            telefone,
            cep,
            rua,
            bairro,
            cidade,
            estado,
            complemento,
            senha: hash,
        })

        if (usuarioCadastrado.length === 0) {
            return res.status(500).json({ "mensagem": "Não foi possível cadastrar o usuário" });
        }

        return res.status(201).json({ "mensagem": "Cadastro realizado com sucesso" });

    } catch (error) {
        return res.status(500).json({ "mensagem": error.message });
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await schemaLogin.validate(req.body);

        const usuarioEncontrado = await knex('usuarios').where('email', email);

        if (usuarioEncontrado.length === 0) {
            return res.status(400).json({ "mensagem": "Email ou senha incorretos" });
        }

        const usuario = usuarioEncontrado[0]
        const result = await pwd.verify(Buffer.from(senha), Buffer.from(usuario.senha, 'hex'))

        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json({ "mensagem": "Email ou senha incorretos" });
            case securePassword.VALID:
                break
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString('hex')
                    await knex('usuarios').update({ senha: hash }).where({ email })
                } catch {
                }
                break
        }

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        })

        return res.status(200).json({
            "usuario":
            {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email
            },
            "token": token
        });

    } catch (error) {
        return res.status(500).json({ "mensagem": error.message });

    }

}

module.exports = {
    cadastroDeUsuario,
    login
}