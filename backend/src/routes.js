// Importando o Express para a variavel express
const express = require('express');
// Importando a Controler de ONGS
const OngController = require('./controllers/OngController');
// Importando a Controler de Incidents
const IncidentController = require('./controllers/IncidentController');
// Importando a Controler de ProfileController
const ProfileController = require('./controllers/ProfileController');
// Importando a controller responsavel pelo login
const SessionController = require('./controllers/SessionController');
// Aqui, estou separando modulo de rotas do modulo Express.
const routes = express.Router();

//
routes.post('/sessions', SessionController.create);
// Criando rota para criar o registro de uma ong
routes.post('/ongs', OngController.create);
// Criando rota para retornar todas as ongs cadastradas no sistema
routes.get('/ongs', OngController.index);
// Rota para listar incidents de uma ong
routes.get('/profile', ProfileController.index);
// Criando a rota para cadastrar os Incident
routes.post('/incidents', IncidentController.create);
// Criando a rota para consultar os incidents
routes.get('/incidents', IncidentController.index);
// Gerando a rota para remover incident
routes.delete('/incidents/:id', IncidentController.delete);


/**
 * Aqui, estou exportando meu modulo para que seja utilizado em outras
 * partes do projeto
 */
module.exports = routes;



// Rotas e recursos
/** Criando a rota e definindo um path, além de definir um tipo
* de resposta.
*
* METODOS HTTP:
* - GET: Buscar/listar uma informação do back-end
* - POST: Criar uma informação no back-end
* - PUT Alterar uma informação no back-end
* - DELETE: Deletar uma informação no back-end
*/

/**
 * Tipo de parâmetros
 * Query Params: São parametros nomeados enviados na rota após "?" (Filtros, paginação, etc)
 * Route Params: Parametros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */
    /**
     * Aqui, estou salvando o que foi enviado no request e salvando na variavel - QueryParams
     * Ex: http://localhost:3333/users?name=Allan&idade=33
     *  const params = request.query;
     *  console.log(params);
     */

    /**
     * Para acessar os routeParams usamos o Params ao inves do query 
     * Ex: http://localhost:3333/users/1
     * const params = request.params
     * console.log(params)
     */

     /**
      * Resquest Body: Estou enviando um body para criar ou alterar algum elemento, para 
      * capturá-lo:
      * const params = request.body;
      * console.log(params);
      */

    // Aqui estou enviando um Hello World no navegador
    //return response.send('Hello World!')