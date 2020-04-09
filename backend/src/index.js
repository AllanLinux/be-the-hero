// Importando o Express para a variavel express
const express = require('express');
// Importando o cors
const cors = require('cors');
// Importando o routes.js
const routes = require('./routes');
// Criando Variavel para armazenar a aplicação
const app = express();
//
app.use(cors());
// Aqui, determino no Express que todo JSON recebido é um objeto do tipo JavaScript
app.use(express.json());
// Configurando a utilização das rotas
app.use(routes);
// Configurando porta a ser escutada.
app.listen(3333);