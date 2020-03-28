/**
 * Server na porta localhost:3333
 */

const app = require('./app')
app.listen(3333, () => {
    console.log('running on port 3333');
})