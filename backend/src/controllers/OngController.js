// Importando o pacote Crypto
const crypto = require('crypto');
// Importando o arquivo de conexao com banco
const connection = require('../database/connection');
// Aqui, exportando o objeto JS com a função create
module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create (request, response) {
    // Capturar o body da requisição com desestruturação
    const {name, email, whatsapp, city, uf} = request.body;
    // Aqui, gerará 4 bits de caracteres aleatórios, convertendo em string do tipo hexadecimal
    const id = crypto.randomBytes(4).toString('HEX');

    // Aqui, faço a inserção dos dados na tabela ongs
    // await aguardará a conclusão da inserção antes de retornar a resposta
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({ id });
    }
};