'use strict'
const Services = require('../services')
const { getErrMsg } = require('../myutil')

class ApplicationController {
  // 添加申请
  async addApplication(req, res) {
    try {
      const data = { ...req.body }
      data.type = JSON.parse(data.type)
      const result = await Services.application.addApplication(data)
      if (result)
        res.sendOk({})
      else
        throw 'CREATE_APPLICATION_FAILED'
    } catch (error) {
      console.log(error)
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  // 获取申请列表
  async getApplication(req, res) {
    try {
      const data = req.body
      console.log(data)
      if (data.currentPage && data.pageSize) {
        const result = await Services.application.getApplication(data)
        res.sendOk(result)
      }
      else {
        throw 'PARAMS_WRONG'
      }
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  async operateApplication(req, res) {
    try {
      const data = req.body
      const result = await Services.application.operateApplication(data)
      if (result)
        res.sendOk({})
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
}

module.exports = new ApplicationController()
