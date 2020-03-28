const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    //Execultando as migrations antes de executar o teste
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    //Finalizar a conexão ao final de todos os testes
    afterAll(async () => {
        await connection.destroy()
    })

    it('should ne able to criate a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAJ",
                email: "apaj@gmail.com",
                whatsapp: "89994759680",
                city: "Floriano",
                uf: "PI"
            })

        /**
         * Caso necessite de um header
         * .set('authorization', 'asas')
         */
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})