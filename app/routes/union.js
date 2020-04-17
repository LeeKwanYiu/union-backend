'use strict'

const Controllers = require('../controllers')

module.exports = app => {
  app.route('/api/myunion')
    .get(Controllers.union.myUnion)
  app.route('/api/unions')
    .post(Controllers.union.getAllUnion)
  app.route('/api/unions/application')
    .post(Controllers.union.applyUnion)
  app.route('/api/unions/:unionId/application')
    .get(Controllers.union.getUnionApplication)
  app.route('/api/unions/:unionId/application/:applicationId')
    .delete(Controllers.union.operateUnionApplication)
  app.route('/api/unions/:unionId/users')
    .get(Controllers.union.getUnionUser)
  app.route('/api/unions/users/role')
    .post(Controllers.union.changeUserRole)
}