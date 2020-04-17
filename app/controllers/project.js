'use strict'

const Services = require('../services')
const { getErrMsg } = require('../myutil')

class PrejectController {
  async addProject(req, res) {
    try {
      const data = req.body
      if (data.projectName && data.unionId && data.creator) {
        const result = await Services.projects.addProject(data)
        res.sendOk(result)
      }
      else
        throw 'SERVER_ERROR'
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
  async getProject(req, res) {
    try {
      const result = await Services.projects.getProject(req.params, req.query)
      res.sendOk(result)
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
}

module.exports = new PrejectController()