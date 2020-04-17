'use strict'

const Controllers = require('../controllers')

module.exports = app => {
  app.route('/api/tasks')
    .post(Controllers.task.addTask)
  app.route('/api/projects/:projectId')
    .get(Controllers.task.getTasks)
  app.route('/api/tasks/:taskId')
    .post(Controllers.task.modifyTask)
}

