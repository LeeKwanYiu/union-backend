'use strict'
const Services = {}

Services.users = require('./users')
Services.unions = require('./unions')
Services.application = require('./application')
Services.projects = require('./project')
Services.tasks = require('./task')

module.exports = Services