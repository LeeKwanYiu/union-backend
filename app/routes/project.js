'use strict'

const Controllers = require('../controllers')

module.exports = app => {
  app.route('/api/project')
    .post(Controllers.project.addProject)
  app.route('/api/unions/:unionId/projects')
    .get(Controllers.project.getProject)
}