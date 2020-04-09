const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        /**
         * Buscando de dentro do request.query, buscar o parametro "page"
         * Se não encontrar usará o valor padrao 1, 
         */
        const { page = 1} = request.query;

        // Query para retornar o total de casos
        const [count] = await connection('incidents')
        .count();
        // O resultado de count será enviado para o header
        response.header('X-Total-Count', count['count(*)']);

        const incidents = await connection('incidents')
        /**
         * Trazendo dados da tabela ongs onde o id seja igual
         * ap ong_id
         */
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        // Limitar a busca por 5 registros
        .limit(5)
        // Pular 5 registros por vez
        .offset((page - 1)*5)
        // Selecionando os dados de quais tabelas e quais campos desejo retornar
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);
    
        return response.json(incidents);
    },

    async create(request, response) {
        const {title, description, value} = request.body;
        // Acessando a id de acesso, autorização
        const ong_id = request.headers.authorization;
        /**
         * Inserindo os valores na tabela "Incidents" 
         * usando o [id] para retornar o id gerado no cadastro desse incidente
         */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        // Pegando o id que vem de dentro do request
        const { id } = request.params;
        // Pegar o id da ong logada
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        // Filtrando o id que seja igual ao id da tabela
        .where('id', id)
        // Selecionando apenas a coluna ong_id
        .select('ong_id')
        // Como retornará apenas 1 resultado, filtrando o primeiro registro
        .first();

        // Se o id for diferente do id da ong, retornará erro 401, sem autorização
        if(incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
        // Caso nao caia no if, removerá o registro
        await connection('incidents').where('id', id).delete();
        // Status de que deu sucesso, mas sem conteudo para enviar de resposta, tipo void
        return response.status(204).send();
    }
}