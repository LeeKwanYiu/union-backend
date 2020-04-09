'use strict'

const myutil = {}

myutil.crypto = require('./crypto')
myutil.auth = require('./authentication')
myutil.getErrMsg = require('./error-response')

module.exports = myutil