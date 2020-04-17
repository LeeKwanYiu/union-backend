'use strict'

const mdb = require('../models')
const { auth } = require('../myutil')

class ProjectService {
  async addProject(data) {
    try {
      console.log(data)
      const union = await mdb.Union.findOne({ _id: data.unionId })
      const admins = union.adminUsers
      if (admins.includes(data.creator)) {
        const project = await mdb.Project.create({
          ...data
        })
        return project
      }
      else
        throw error
    } catch (error) {
      throw 'CREATE_PROJECT_FAILED'
    }
  }
  async getProject(params, query) {
    try {
      const { unionId } = params
      let result = mdb.Project.find({ unionId })
      if (query.year !== 'all') {
        result = result.where('createdAt')
          .gte(Date.parse(`${query.year}-01-01`))
          .lte(Date.parse(`${Number(query.year) + 1}-01-01`))
      }
      if (query.name !== '') {
        const reg = new RegExp(query.name)
        result = result.where({ projectName: reg })
      }
      return result;
    } catch (error) {
      throw 'SERVER_ERROR'
    }
  }
}

module.exports = new ProjectService()