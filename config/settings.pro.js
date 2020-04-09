'use strict'

module.exports = {
  saltKey: 'union',
  dbConfig: {
    URL: 'mongodb://127.0.0.1:27017/union',
    DB: 'union',
    HOST: '127.0.0.1',
    PORT: 27017,
    USERNAME: 'admin',
    PASSWORD: 'admin'
  },
  adminConfig: {
    name: 'admin',
    password: 'admin'
  }
}