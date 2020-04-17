'use strict'

const Services = require('../services')
const { getErrMsg } = require('../myutil')

class TaskController {
  async addTask(req, res) {
    try {
      const data = req.body
      if (data.taskName && data.projectId && data.creatorId && data.userId) {
        const result = await Services.tasks.addTask(data)
        res.sendOk(result)
      }
      else
        throw 'CREATE_TASK_ERROR'
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  async getTasks(req, res) {
    try {
      const result = await Services.tasks.getTasks(req.params)
      res.sendOk(result)
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  // 更新任务
  async modifyTask(req, res) {
    try {
      const result = await Services.tasks.modifyTask(req.body, req.params)
      if (result)
        res.sendOk({})
      else
        throw 'SERVER_ERROR'
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
}

module.exports = new TaskController()