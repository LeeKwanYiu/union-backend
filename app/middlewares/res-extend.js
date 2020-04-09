'use strict'

module.exports = (req, res, next) => {
  res.sendOk = (data = {}) => {
    const rst = {
      status: 200,
      errorCode: 0,
      data,
    }
    res.send(rst)
  }

  res.sendErr = (errorInfo) => {
    res.send(errorInfo)
  }

  next()
}