/**
 * Gera um ID aleatório e verifica se já existe no banco de dados
 */

const crypto = require('crypto')
module.exports = function generateID() {
    return crypto.randomBytes(4).toString('HEX')
}