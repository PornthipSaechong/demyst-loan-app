
const util = require('util')
const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const OpenApiValidator = require('express-openapi-validator')

const schema1 = require('./swaggers/users-swagger.json')
const schema2 = require('./swaggers/account-swagger.json')
const schema3 = require('./swaggers/decision-swagger.json')

const usersRoute = require('./routers/users.route')
const accountsRoute = require('./routers/accounts.route')
const loanRoute = require('./routers/decision.route')

const server = express()

server.use(bodyParser.json())

server.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))

const schemas = [schema1, schema2, schema3]

for (const schema of schemas) {
  server.use(
    OpenApiValidator.middleware({
      apiSpec: schema,
      validateRequests: true
    })
  )
}

server.use('/v1/users', usersRoute)
server.use('/v1/accounts', accountsRoute)
server.use('/v1/loan', loanRoute)

server.use('/status', (req, res) => {
  res.json({
    status: 'OK'
  })
})

server.use((err, req, res, next) => {
  res.status(500)
  res.json(err)
})

server.listen(5000)
