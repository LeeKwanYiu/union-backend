'use strict'

const mdb = require('../models')
const moment = require('moment')

const state = ['未处理', '审核中', '已完成']

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
      result.message.unshift({ detail: `${creator.name}创建了${result.taskName}` })
      result.save()
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

  async getSingleTask(params) {
    try {
      const { taskId } = params
      let result = await mdb.Task.findOne({ _id: taskId })
      // result = JSON.parse(JSON.stringify(result))
      // result.message.forEach((element, index) => {
      //   result.message[index].time = moment(element.time).format('YYYY-MM-DD HH:mm:ss')
      // });
      return result.toObject();
    } catch (error) {
      throw 'SERVER_ERROR'
    }
  }

  // 更新任务
  async modifyTask(data, params) {
    try {
      const { taskId } = params
      const task = await mdb.Task.findOne({ _id: taskId })
      const user = await mdb.User.findOne({ _id: data.userId })
      if (data.taskState || data.taskState === 0) {
        task.taskState = data.taskState
        task.message.unshift({ detail: `${user.name}将状态更新为${state[data.taskState]}` })
      }
      if (data.detail) {
        task.detail = data.detail
        task.message.unshift({ detail: `${user.name}更新任务详情` })
      }
      task.updatedAt = Date.now()
      task.save()
      return true
    } catch (error) {
      throw 'SERVER_ERROR'
    }
  }

  async getTimes(params) {
    try {
      const { taskId } = params
      const task = await mdb.Task.findOne({ _id: taskId })
      // const times = JSON.parse(JSON.stringify(task.message))
      // const result = {}
      // times.forEach(({ time, detail, _id }) => {
      //   const detail_time = moment(time).format('LT')
      //   const date = moment(time).format('YYYY-MM-DD')
      //   const obj = { detail_time, detail, _id }
      //   if (!result[date]) {
      //     result[date] = []
      //     result[date].push(obj)
      //   }
      //   else {
      //     result[date].push(obj)
      //   }
      // });
      const message = JSON.parse(JSON.stringify(task.message))
      message.forEach((element, index) => {
        message[index].time = moment(element.time).format('YYYY-MM-DD HH:mm:ss')
      });
      return message
    } catch (error) {
      throw 'SERVER_ERROR'
    }
  }
}

module.exports = new TaskService()