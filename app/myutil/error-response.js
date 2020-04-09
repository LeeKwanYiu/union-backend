'use strict'

const { errorMsg } = require('../../config')

module.exports = function (message) {
  const msg = errorMsg[message] ? errorMsg[message] : errorMsg['SERVER_ERROR']
  return msg
}