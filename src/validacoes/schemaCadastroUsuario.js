const yup = require('./settings');

const schemaCadastroUsuario = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório'),
    email: yup.string().email().required('O campo email é obrigatório'),
    cpf: yup.string().required('O campo cpf é obrigatório'),
    telefone: yup.string().required('O campo telefone é obrigatório'),
    senha: yup.string().required('O campo senha é obrigatório').min(6)
})

module.exports = {
    schemaCadastroUsuario
}