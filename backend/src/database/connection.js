/**Para conexão com o banco de dados */
const knex = require('knex')
//Importando as configurações do banco de dados
const configuration = require('../../knexfile')

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

//Carregando a configuração de desenvolvimento
const connection = knex(config)

module.exports = connection