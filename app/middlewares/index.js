'use strict'
const middleware = {}

middleware.notFind = require('./not-find')
middleware.resExtend = require('./res-extend')
middleware.verifyToken = require('./verify-token')

module.exports = middleware