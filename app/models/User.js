'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const MessageSchema = new Schema({
  detail: { type: String },
  createdAt: { type: Date, default: Date.now }
})

MessageSchema.path('createdAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

const UserSchema = new Schema({
  name: { type: String, required: 'name is required' },  // 用户名
  password: { type: String },
  studentNum: { type: String, required: 'studentNum is required' },  // 学生号
  sex: { type: Number, enum: [0, 1] }, // 性别
  faculty: String, // 学院
  union: { type: [String], default: [] }, // 加入的社团ID
  message: { type: [MessageSchema], default: [] },
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
