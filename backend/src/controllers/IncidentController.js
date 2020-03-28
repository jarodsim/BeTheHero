const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        //Paginação
        const {
            page = 1
        } = req.query

        //Retornar a quantidade
        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents').join('ongs', 'ongs.id', '=', 'incidents.ong_id').limit(5).offset((page - 1) * 5)
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'])

        //Enviando para o cabeçalho da requisição o total
        res.header('X-Total-Count', count['count(*)'])

        return res.json(incidents)
    },
    async create(req, res) {
        const {
            title,
            description,
            value
        } = req.body
        //PEgando o ID da ONG que estiver logada através do cabeçalho da requisição
        const ong_id = req.headers.authorization

        //retornara uma array com o ID
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        return res.json({
            id
        })
    },
    async delete(req, res) {
        //Pegando o ID pelo parametro de rota
        const {
            id
        } = req.params

        //Pegando o ID da ONG logada
        const ong_id = req.headers.authorization

        //Buscando incident para verificar se a ONG é a criadora desse incident
        const incident = await connection('incidents').where('id', id).select('ong_id').first()

        if (incident.ong_id != ong_id) {
            return res.status(401).json({
                error: "Operation not permited"
            })
        }

        //Deletando do banco
        await connection('incidents').where('id', id).delete()

        return res.status(204).send()
    }
}