'use strict'
const crypto = require('crypto')

module.exports = {
  // 密码加密
  encrypted(password, saltKey) {
    // 使用aes192加密算法
    const cipher = crypto.createCipher('aes192', saltKey)
    let newPsd = ''
    newPsd += cipher.update(password, 'utf8', 'hex')
    newPsd += cipher.final('hex') // 返回字符串
    return newPsd
  },
  // 密码对比
  checkPasswd(inputPasswd, userPasswd) {
    let result
    if (inputPasswd === userPasswd) {
      result = true
    } else {
      result = false
    }
    return result
  }
}