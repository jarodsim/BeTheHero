/**
 * Conexãom com o banco de dados
 */
const knex = require('knex')
const configuration = require('../../knexfile')

//Verificando para se é teste ou desenvolvimento para apontar para o banco de dados correto
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

//Carregando as configurações do banco
const connection = knex(config)

module.exports = connection