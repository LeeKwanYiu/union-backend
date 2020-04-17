'use strict'
/*
所有接口的status均为200；
errorCode规则：当errorCode为0时表示接口访问成功并且无抛错；不为零时，errorCode共计五位，
第一位表示错误级别，1开头的为系统级别错误，2开头为系统功能模块对应的错误，其中，第二三位
表示功能模块编号，第四五位表示具体错误编号。
*/

module.exports = {
  // 系统级别错误
  NOT_FIND_ROUTE: {
    status: 200,
    errorCode: 10000,
    errorMsg: '访问的路由不存在'
  },
  SERVER_ERROR: {
    status: 200,
    errorCode: 10001,
    errorMsg: '服务器开小差去了'
  },
  PARAMS_WRONG: {
    status: 200,
    errorCode: 10002,
    errorMsg: '参数错误'
  },
  // token认证模块错误
  TOKEN_IS_MISSING: {
    status: 200,
    errorCode: 20000,
    errorMsg: 'token缺失'
  },
  TOKEN_IS_INVALID: {
    status: 200,
    errorCode: 20001,
    errorMsg: 'token无效'
  },
  TOKEN_HAS_EXPIRED: {
    status: 200,
    errorCode: 20002,
    errorMsg: 'token已经过期'
  },
  // 登录模块
  USER_NOT_EXITS: {
    status: 200,
    errorCode: 20101,
    errorMsg: '用户不存在'
  },
  USER_PASSWORD_WRONG: {
    status: 200,
    errorCode: 20102,
    errorMsg: '密码错误'
  },
  // 申请模块
  APPLICATION_HAS_EXITS: {
    status: 200,
    errorCode: 20201,
    errorMsg: '已创建申请',
  },
  UNION_HAS_EXITS: {
    status: 200,
    errorCode: 20202,
    errorMsg: '社团已存在'
  },
  GET_APPLICATION_FAILED: {
    status: 200,
    errorCode: 20203,
    errorMsg: '获取社团失败'
  },
  // 社团模块
  APPLICATION_HAS_EXISTS: {
    status: 200,
    errorCode: 20301,
    errorMsg: '已申请过社团'
  },
  CREATE_TASK_ERROR: {
    status: 200,
    errorCode: 20302,
    errorMsg: '创建任务失败'
  }
}