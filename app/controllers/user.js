'use strict'
const Services = require('../services')
const { auth, getErrMsg } = require('../myutil')

class UsersController {
  // 新建用户
  async create(req, res) {
    try {
      const result = await Services.users.addUser(req.body)
      const id = result.userId
      result.token = auth.createToken(id)
      res.sendOk(result)
    } catch (error) {
      res.sendErr(error)
    }
  }
  // 验证
  async verify(req, res) {
    try {
      const { token = '' } = req.body
      await Services.users.verify(token)
      res.sendOk()
    } catch (error) {
      const errorRes = getErrMsg(error)
      res.sendErr(errorRes)
    }
  }
  // 登录
  async login(req, res) {
    try {
      const result = await Services.users.login(req.body)
      const { id } = result
      result.token = auth.createToken(id)
      res.sendOk(result)
    } catch (error) {
      const errorRes = getErrMsg(error)
      res.sendErr(errorRes)
    }
  }
  // 获取用户信息
  async getUserInfo(req, res) {
    try {
      const token = req.headers.authorization
      const result = await Services.users.getUserInfo(token)
      res.sendOk(result)
    } catch (error) {
      res.sendErr()
    }
  }
  // 获取用户消息通知
  async removeMessage(req, res) {
    try {
      const token = req.headers.authorization
      await Services.users.removeMessage(token)
      res.sendOk({})
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
}

module.exports = new UsersController()
