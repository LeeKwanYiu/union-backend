'use strict'
const mdb = require('../models')
const { crypto, auth } = require('../myutil')
const { settings } = require('../../config')
class UserService {
  // 添加用户
  async addUser(data) {
    try {
      const findRes = await mdb.User.findOne({ studentNum: data.studentNum })
      if (findRes) {
        throw 'USER_HAS_EXISTS'
      }
      data.password = crypto.encrypted(data.password, settings.saltKey)
      const result = await mdb.User.create(data)
      console.log(result)
      return result.toObject();
    } catch (error) {
      throw error
    }
  }
  // 验证token
  async verify(token) {
    try {
      const ifVerified = auth.verifyToken(token)
      return ifVerified
    } catch (error) {
      throw error
    }
  }
  // 登录
  async login(params) {
    try {
      let inputPasswd
      let equal
      // 判断
      if (params.name === 'admin') {
        const findAdminRes = await mdb.Admin.findOne({ name: params.name })
        inputPasswd = crypto.encrypted(params.password, settings.saltKey)
        equal = await crypto.checkPasswd(inputPasswd, findAdminRes.password)
        if (!equal) {
          const errorMsg = 'USER_PASSWORD_WRONG'
          throw errorMsg
        }
        else {
          const result = findAdminRes.toObject()
          const { id, name, token } = result
          return { id, name, token, role: 'admin' }
        }
      }
      const findUserRes = await mdb.User.findOne({ studentNum: params.name }) // lean设置为true返回js对象
      if (!findUserRes) {
        const errorMsg = 'USER_NOT_EXITS'
        throw errorMsg
      }
      inputPasswd = crypto.encrypted(params.password, settings.saltKey)
      equal = await crypto.checkPasswd(inputPasswd, findUserRes.password)
      if (!equal) {
        const errorMsg = 'USER_PASSWORD_WRONG'
        throw errorMsg
      }
      else {
        const result = findUserRes.toObject()
        const { id, name, union, studentNum, sex, token } = result
        return { id, name, union, studentNum, sex, token, role: 'user' }
      }
    } catch (error) {
      throw error
    }
  }
  // 获取用户信息
  async getUserInfo(params) {
    try {
      const { userId } = auth.verifyToken(params)
      const findAdminRes = await mdb.Admin.findOne({ _id: userId })
      if (findAdminRes) {
        const result = findAdminRes.toObject()
        const { id, name, token } = result
        return { id, name, token, role: 'admin' }
      }
      const findUserRes = await mdb.User.findOne({ _id: userId })
      if (findUserRes) {
        const result = findUserRes.toObject()
        const { id, name, union, studentNum, sex, token, message } = result
        return { id, name, union, studentNum, sex, token, role: 'user', message }
      }
      else
        throw 'SERVER_ERROR'
    } catch (error) {
      const errorMsg = 'SERVER_ERROR'
      throw errorMsg
    }
  }
  // 清空通知
  async removeMessage(params) {
    try {
      const { userId } = auth.verifyToken(params)
      await mdb.User.findByIdAndUpdate(userId, { message: [] })
    } catch (error) {
      const errorMsg = 'SERVER_ERROR'
      throw errorMsg
    }
  }
}

module.exports = new UserService()