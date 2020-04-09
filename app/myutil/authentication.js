'use strict'

const jwt = require('jsonwebtoken')
const { settings } = require('../../config')

module.exports = {
  createToken(uuid) {
    const token = jwt.sign(
      { userId: uuid },
      settings.jwtSecret,
      { expiresIn: 3600 * 24 }
    )
    return token
  },
  verifyToken(token) {
    try {
      const result = jwt.verify(token, settings.jwtSecret)
      return result
    } catch (error) {
      const { name } = error
      const errorType = {
        "JsonWebTokenError": "TOKEN_IS_INVALID",
        "TokenExpiredError": "TOKEN_HAS_EXPIRED"
      }
      throw errorType[name]
    }
  }
}