/**
 * Controller Ong
 * create, list, delete
 */

const connection = require('../database/connection')
const generateUniqueID = require('../utils/generateUniqueID')

module.exports = {

    //Listar
    async index(req, res) {
        const ongs = await connection('ongs').select('*')

        return res.json(ongs)
    },

    //Criar
    async create(req, res) {
        const {
            name,
            email,
            password,
            whatsapp,
            city,
            uf
        } = req.body

        const id = await generateUniqueID()

        await connection('ongs').insert({
            id,
            name,
            email,
            password,
            whatsapp,
            city,
            uf
        })

        return res.json({
            id
        })
    },

    //Deletar
    async delete(req, res) {
        //Pegando ID da ONG
        const id = req.headers.authorization

        //Deletando do banco
        await connection('ongs').where('id', id).delete()

        return res.status(204).send()
    }
}