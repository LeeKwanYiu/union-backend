'use strict'
const mongoose = require('mongoose')
const { settings } = require('../config')

const inits = require('./index')

const URL = settings.dbConfig.URL
const OPTION = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  auth: {
    user: settings.dbConfig.USERNAME,
    password: settings.dbConfig.PASSWORD
  },
  authSource: 'admin'  // 需要依赖admin数据库认证
}

// 连接数据库
mongoose.Promise = global.Promise // 将mongoose自身的promise替代为ES6promise
mongoose.connect(URL, OPTION)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('成功连接数据库')
});
db.on('connected', () => {
  inits.createAdmin(settings.adminConfig.name, settings.adminConfig.password, settings.saltKey)
})



