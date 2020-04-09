'use strict'

const Controllers = require('../controllers')

module.exports = app => {
  app.route('/api/application')
    .post(Controllers.application.addApplication)
  app.route('/api/applicationlist')
    .post(Controllers.application.getApplication)
  app.route('/api/application/operation')
    .post(Controllers.application.operateApplication)
}