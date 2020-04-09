'use strict'

const Controllers = require('../controllers')
const middleware = require('../middlewares')

module.exports = function (app) {
  app.use(middleware.resExtend)
  app.post('/api/user', Controllers.user.create)
  app.post('/api/login', Controllers.user.login)
  app.post('/api/verify', Controllers.user.verify)
  app.use(middleware.verifyToken)
  app.get('/api/user', Controllers.user.getUserInfo)
  require('./application')(app)
  require('./user')(app)
  app.use(middleware.notFind)
}
