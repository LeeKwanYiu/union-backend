'use strict'

const controllers = {}
controllers.user = require('./user')
controllers.application = require('./application')
controllers.union = require('./unions')
controllers.project = require('./project')
controllers.task = require('./task')

module.exports = controllers