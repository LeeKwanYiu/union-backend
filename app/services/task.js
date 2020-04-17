'use strict'

const mdb = require('../models')
const { auth } = require('../myutil')

class TaskService {
  async addTask(data) {
    try {
      const user = await mdb.User.findOne({ _id: data.userId })
      const creator = await mdb.User.findOne({ _id: data.creatorId })
      const result = await mdb.Task.create({
        taskName: data.taskName,
        projectId: data.projectId,
        user: {
          name: user.name,
          id: data.userId
        },
        creator: {
          name: creator.name,
          id: data.creatorId
        }
      })
      const project = await mdb.Project.findOne({ _id: data.projectId })
      const union = await mdb.Union.findOne({ _id: project.unionId })
      user.message.push({ detail: `${union.unionName}中${project.projectName}项目有一项任务待处理` })
      user.save()
      return result
    } catch (error) {
      throw 'CREATE_TASK_ERROR'
    }
  }

  async getTasks(params) {
    try {
      const { projectId } = params
      let result = mdb.Task.find({ projectId })
      return result;
    } catch (error) {
      throw 'SERVER_ERROR'
    }
  }

  async modifyTask(data, params) {
    try {
      const { taskId } = params
      await mdb.Task.findByIdAndUpdate(taskId, data)
      return true
    } catch (error) {
      throw 'SERVER_ERROR'
    }
  }
}

module.exports = new TaskService()