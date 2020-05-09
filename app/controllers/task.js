'use strict'

const Services = require('../services')
const { getErrMsg } = require('../myutil')

const multer = require('multer')
const path = require('path')

// 定义存储路径和文件名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const url = path.normalize(__dirname)
    const url = path.join(__dirname, '..', '..', 'public')
    cb(null, url)
  },
  filename: (req, file, cb) => {
    const { taskId } = req.params
    cb(null, taskId + '-' + file.originalname)
  }
})

const upload = multer({ storage }).single('file')

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

  async getSingleTask(req, res) {
    try {
      const result = await Services.tasks.getSingleTask(req.params)
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
  async getTimes(req, res) {
    try {
      const result = await Services.tasks.getTimes(req.params)
      res.sendOk(result)
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }

  // 文件上传
  async fileUpload(req, res) {
    upload(req, res, async err => {
      try {
        if (err) {
          throw 'UPLOAD_MISTAKE'
        }
        await Services.tasks.upload(req.params, req.file, req.body)
        res.sendOk({})
      } catch (error) {
        const errMsg = getErrMsg(error)
        res.sendErr(errMsg)
      }
    })
  }

  // 删除文件
  async deleteFile(req, res) {
    try {
      await Services.tasks.deleteFile(req.params, req.body)
      res.sendOk({})
    } catch (error) {
      const errMsg = getErrMsg(error)
      res.sendErr(errMsg)
    }
  }
}

module.exports = new TaskController()