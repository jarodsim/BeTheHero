/**
 * Controller Section
 */
const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const {
            email,
            password
        } = req.body

        const ong = await connection('ongs').where('email', email).where('password', password).select('id').select('name').first()

        if (!ong) {
            return res.status(400).json({
                error: 'No ONG found'
            })
        }

        return res.json(ong)
    }
}