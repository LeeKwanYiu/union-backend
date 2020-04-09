'use strict'

const mdbs = require('../app/models')
const myutil = require('../app/myutil')

module.exports = async (name, password, saltKey) => {
  try {
    const findRes = await mdbs.Admin.findOne({ name: name })
    if (findRes) {
      console.log('admin用户已存在，请勿重复添加')
      return 'admin用户已存在，请勿重复添加'
    } else {
      const newPsd = myutil.crypto.encrypted(password, saltKey)
      await mdbs.Admin.create({
        name: name,
        password: newPsd
      })
      console.log('添加管理员成功')
    }
  } catch (error) {
    console.log('添加管理员操作存在错误')
    return '添加admin用户的操作存在失误'
  }
}