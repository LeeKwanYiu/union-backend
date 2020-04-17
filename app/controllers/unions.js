'use strict'

const Services = require('../services')
const { getErrMsg } = require('../myutil')

class UnionController {
  // 获取当前用户社团
  async myUnion(req, res) {
    try {
      const token = req.headers.authorization
      const result = await Services.unions.getMyUnion(token)
      res.sendOk(result)
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  // 获取社团
  async getAllUnion(req, res) {
    try {
      const result = await Services.unions.getAllUnion(req.body)
      res.sendOk(result)
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  // 申请加入社团
  async applyUnion(req, res) {
    try {
      const result = await Services.unions.applyUnion(req.body)
      if (result)
        res.sendOk({})
      else
        throw 'SERVER_ERROR'
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  // 获取申请列表
  async getUnionApplication(req, res) {
    try {
      const result = await Services.unions.getUnionApplication(req.params)
      res.sendOk(result)
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  // 操作申请
  async operateUnionApplication(req, res) {
    try {
      await Services.unions.operateUnionApplication(req.params, req.query)
      res.sendOk({})
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  // 获取用户成员
  async getUnionUser(req, res) {
    try {
      const result = await Services.unions.getUnionUser(req.params)
      res.sendOk(result)
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  // 改变用户等级
  async changeUserRole(req, res) {
    try {
      await Services.unions.changeUserRole(req.body)
      res.sendOk({})
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
}

module.exports = new UnionController()