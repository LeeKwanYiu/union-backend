'use strict'
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { settings } = require('./config')
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

// 请求体解析中间件
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 引入路由
const routes = require('./app/routes')
// 注册路由
routes(app)

console.log(new mongoose.Types.ObjectId)

// 配置静态文件
app.use(express.static(path.join(__dirname, 'app/public')))
// 配置apidoc
app.use('/apidoc', express.static(path.join(__dirname, 'app/public/apidoc/')))

// 连接数据库
mongoose.Promise = global.Promise
mongoose.connect(URL, OPTION)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('success')
});

app.listen(3001)
console.log('express-blog server started on: ' + 3001)
