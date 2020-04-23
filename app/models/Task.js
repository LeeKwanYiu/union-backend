'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
})

const messageSchema = new Schema({
  detail: { type: String, required: true },
  time: {
    type: Date,
    default: Date.now,
    // get: val => moment(val).format('YYYY-MM-DD HH:mm:ss')
  }
})

const documentSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'done'
  },
  uid: {
    type: String,
    default: function () {
      return this._id
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// 默认富文本框内容 
const defaultContent = "<p><strong>任务内容：</strong></p><p></p><p></p><p></p><p></p><p></p><p><strong>完成情况：</strong></p><p></p><p></p>"

const TaskSchema = new Schema({
  taskName: { type: String, required: 'name is required' },
  detail: { type: String, default: defaultContent },
  creator: { type: UserSchema, required: true },
  user: { type: UserSchema, required: 'userid is required' },
  projectId: { type: String, required: 'projectid is required' },
  taskState: { type: Number, enum: [0, 1, 2], default: 0 },
  files: { type: [documentSchema], default: [] },
  message: { type: [messageSchema], default: [] },
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
TaskSchema.set('toJSON', { getters: true, virtuals: true })
TaskSchema.set('toObject', { getters: true, virtuals: true })

TaskSchema.path('createdAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})
TaskSchema.path('updatedAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

module.exports = mongoose.model('Task', TaskSchema)