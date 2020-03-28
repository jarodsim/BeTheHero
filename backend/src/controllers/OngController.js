/**
 * ficará os arquivos da lógica de funcionamento das rotas
 */

//Importando arquivo de conexão ao banco de dados
const connection = require('../database/connection')
//Pacote para cria o ID (Primary Key)
const generateUniqueID = require('../utils/generateUniqueID')

module.exports = {
    //Listar
    async index(req, res) {
        const ongs = await connection('ongs').select('*')

        return res.json(ongs)
    },
    //Adicionar
    async create(req, res) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf
        } = req.body

        const id = generateUniqueID()

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        //Quando terminar de cadastrar, retornará o ID
        return res.json({
            id
        })
    }
}