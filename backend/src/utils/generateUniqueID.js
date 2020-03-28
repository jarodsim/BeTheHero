/**
 * Gera um ID aleatório e verifica se já existe no banco de dados
 */
const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = async function generateID() {
    let id = crypto.randomBytes(4).toString('HEX')
    let id_exist = await connection('ongs').where({ 'id': id }).first()

    while (id_exist) {
        console.log('ONG com o mesmo ID encontrada. Gerando novo ID');
        id = crypto.randomBytes(4).toString('HEX')
        id_exist = connection('ongs').where({ 'id': id }).first()
    }

    return id
}