'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const TypeSchema = new Schema({
  name: { type: String, required: 'name is required' },  // 用户名
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  })

// 运行调用toJSON和toObject后getters和虚拟属性起作用
UserSchema.set('toJSON', { getters: true, virtuals: true })
UserSchema.set('toObject', { getters: true, virtuals: true })

UserSchema.virtual('userId').get(function () {
  return this._id.toString()
})

UserSchema.path('createdAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})
UserSchema.path('updatedAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

module.exports = mongoose.model('User', UserSchema)
