const express = require('express');
const { cadastroDeUsuario, login } = require('../controladores/usuários');

const route = express();

route.post('/cadastro', cadastroDeUsuario)
route.post('/login', login)




module.exports = route;
