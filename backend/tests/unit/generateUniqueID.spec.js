const generateUniqueID = require('../../src/utils/generateUniqueID')

//Gerar ID aleatório

describe('Generate Unique ID', () => {
    it('should generate a unique ID', () => {
        const id = generateUniqueID()

        expect(id).toHaveLength(8)
    })
})

