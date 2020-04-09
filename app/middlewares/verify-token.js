'use strict'

const { auth, getErrMsg } = require('../myutil')

module.exports = (req, res, next) => {
  const headers = req.headers
  if (!headers.authorization) {
    const errorRes = getErrMsg('TOKEN_IS_MISSING');
    res.sendErr(errorRes)
    return
  }
  try {
    const result = auth.verifyToken(headers.authorization)
    next()
  } catch (error) {
    const errorRes = getErrMsg(error)
    res.sendErr(errorRes)
  }
}