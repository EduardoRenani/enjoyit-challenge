// server.js
const server = require('serverless-http')
const app = require('./src/app')
module.exports.run = server(app)
