'use strict'

const Controllers = require('../controllers')

module.exports = app => {
  app.route('/api/user/message')
    .delete(Controllers.user.removeMessage)
}