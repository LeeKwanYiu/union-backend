let config = require('config')

const settings = config.get('Customer.settings')

config = {}

config.settings = require(`./${settings}`)
config.errorMsg = require('./error-message')


module.exports = config