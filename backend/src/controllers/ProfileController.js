/**
 * O Padrão MVC determina que não pode existir muitos metodos da 
 * mesma natureza numa controller, neste caso, este controller serve
 * para listar os Incidents de uma ong (Seus incidents).
 * 
 */
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(incidents)
    }
}