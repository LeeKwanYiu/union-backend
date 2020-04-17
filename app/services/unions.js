'use strict'

const mdb = require('../models')
const { auth } = require('../myutil')

class UnionService {
  // 获取我的社团
  async getMyUnion(params) {
    try {
      const { userId } = auth.verifyToken(params)
      const findUserRes = await mdb.User.findOne({ _id: userId }, null)
      const myUnions = findUserRes.union
      if (findUserRes) {
        const result = await mdb.Union.find({ _id: { $in: myUnions } })
        return result
      }
      else
        throw 'SERVER_ERROR'
    } catch (error) {
      const errorMsg = 'SERVER_ERROR'
      throw errorMsg
    }
  }
  // 获取全部社团
  async getAllUnion(params) {
    try {
      const { current = 1, pageSize = 8 } = params
      const skip = (current - 1) * pageSize
      let findRes = mdb.Union.find()
      if (params.year !== 'all') {
        const year = Date.parse(`${params.year}-01-01`)
        const nextYear = Date.parse(`${Number(params.year) + 1}-01-01`)
        // result = await findRes.where({ createdAt: { $gte: year, $lte: nextYear } })
        findRes = findRes.where('createdAt').gte(year).lte(nextYear)
      }
      if (params.type !== 'all') {
        findRes = findRes.where({ type: params.type })
      }
      if (params.name !== '') {
        const reg = new RegExp(params.name)
        findRes = findRes.where({ unionName: reg })
      }
      const total = await findRes.count()
      findRes = await findRes.find({}).skip(skip).limit(pageSize)
      return {
        total,
        current,
        list: findRes
      };
    } catch (error) {
      const errorMsg = 'SERVER_ERROR'
      throw errorMsg
    }
  }
  // 申请加入社团
  async applyUnion(data) {
    try {
      const { name, userId, unionId } = data
      const union = await mdb.Union.findOne({ _id: unionId })
      const findRes = union.applicationList.find(v => v.userId === userId)
      if (findRes)
        throw 'APPLICATION_HAS_EXISTS'
      union.applicationList.unshift({ name, userId })
      union.save()
      return true
    } catch (error) {
      throw error
    }
  }
  // 获取社团申请列表 
  async getUnionApplication(params) {
    try {
      const { unionId } = params
      const union = await mdb.Union.findOne({ _id: unionId })
      return union.applicationList
    } catch (error) {
      const err = 'SERVER_ERROR'
      throw err;
    }
  }
  // 操作申请
  async operateUnionApplication(params, query) {
    try {
      const { unionId, applicationId } = params
      const { operation } = query
      const union = await mdb.Union.findOne({ _id: unionId })
      const application = await union.applicationList.id(applicationId)
      if (!application)
        throw 'SERVER_ERROR'
      const { userId } = application
      const user = await mdb.User.findOne({ _id: userId })
      if (operation === 'pass') {
        union.userId.push(userId)
        user.message.push({ detail: `${union.unionName}的加入申请已通过` })
      }
      else
        user.message.push({ detail: `${union.unionName}的加入申请未通过` })
      application.remove()
      union.save()
      user.save()

    } catch (error) {
      const err = 'SERVER_ERROR'
      throw err;
    }
  }
  // 获取社团用户
  async getUnionUser(params) {
    try {
      const { unionId } = params
      const union = await mdb.Union.findOne({ _id: unionId })
      const users = union.userId
      const array = []
      let superAdmin = {}
      let findRes = await mdb.User.find({ _id: { $in: users } }).select('_id name sex studentNum')
      findRes = JSON.parse(JSON.stringify(findRes))
      findRes.forEach((item, index) => {
        if (item._id === union.creator) {
          superAdmin = item
          superAdmin.role = 'super_admin'
        }
        else if (union.adminUsers.includes(item._id)) {
          item.role = 'admin'
          array.unshift(item)
        }
        else {
          item.role = 'user'
          array.push(item)
        }
      })
      return [superAdmin, ...array]
    } catch (error) {
      const err = 'SERVER_ERROR'
      throw err;
    }
  }
  // 改变用户等级
  async changeUserRole(params) {
    try {
      const { userId, unionId, role } = params
      const union = await mdb.Union.findOne({ _id: unionId })
      if (role === 'admin' && !union.adminUsers.includes(userId))
        union.adminUsers.push(userId)
      if (role === 'user' && union.adminUsers.includes(userId)) {
        union.adminUsers.splice(union.adminUsers.indexOf(userId), 1)
      }
      union.save()
    } catch (error) {
      throw 'SERVER_ERROR'
    }
  }
}

module.exports = new UnionService()