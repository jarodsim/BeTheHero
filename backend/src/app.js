/**
 * Server express
 */

const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate')

const app = express()

app.use(cors())

const routes = require('./routes')

app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app