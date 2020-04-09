// Este arquivo configura a conexão do knex, referenciando o arquivo knexfile
// Importando o knex
const knex = require('knex');
// Usando o arquivo knexfile para conf
const configuration = require('../../knexfile');
// Usando o ambiente de dev
const connection = knex(configuration.development);
// Exportando o modulo
module.exports = connection;