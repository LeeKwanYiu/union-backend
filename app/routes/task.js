'use strict'

const Controllers = require('../controllers')

module.exports = app => {
  app.route('/api/tasks')
    .post(Controllers.task.addTask)
  app.route('/api/projects/:projectId')
    .get(Controllers.task.getTasks)
  app.route('/api/tasks/:taskId')
    .post(Controllers.task.modifyTask)
  app.route('/api/tasks/:taskId/times')
    .get(Controllers.task.getTimes)
  app.route('/api/tasks/:taskId')
    .get(Controllers.task.getSingleTask)
}

