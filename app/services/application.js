const mdb = require('../models')

class ApplicationService {
  async addApplication(data) {
    try {
      const findRes = await mdb.Application.findOne({ unionName: data.unionName })
      if (findRes) {
        throw 'APPLICATION_HAS_EXITS'
      }
      const findUnionRes = await mdb.Union.findOne({ unionName: data.unionName })
      if (findUnionRes) {
        throw 'UNION_HAS_EXITS'
      }
      await mdb.Application.create(data)
      return true;
    } catch (error) {
      throw error;
    }
  }
  // 获取申请列表
  async getApplication(data) {
    try {
      const { currentPage = 1, pageSize = 10 } = data
      const skip = (currentPage - 1) * pageSize
      const total = await mdb.Application.count({})
      const sort = { createAt: 'desc' }
      const findRes = await mdb.Application.find({}, null).sort(sort).skip(skip).limit(pageSize)
      const result = {
        total,
        currentPage,
        pageSize,
        list: findRes
      }
      return result
    } catch (error) {
      const err = 'GET_APPLICATION_FAILED'
      throw err
    }
  }
  // 申请操作
  async operateApplication(data) {
    try {
      const { id, operation } = data
      const application = await mdb.Application.findOne({ _id: id })
      const {
        unionName,
        introduction,
        creator,
        type
      } = application.toObject()
      const user = await mdb.User.findOne({ _id: creator })
      if (operation === 'pass') {
        user.message.push({ detail: `${unionName}创建申请通过` })
        const result = await mdb.Union.create({
          unionName,
          introduction,
          userId: [creator],
          creator,
          adminUsers: [creator],
          type
        })
        const unionId = result._id
        user.union.push(unionId)
      } else {
        user.message.push({ detail: `${unionName}创建申请不通过` })
      }
      user.save()
      await mdb.Application.findByIdAndRemove(id)
      return true
    } catch (error) {
      throw 'OPERATE_FAILED'
    }
  }
}

module.exports = new ApplicationService()