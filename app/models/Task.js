'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
})
const TaskSchema = new Schema({
  taskName: { type: String, required: 'name is required' },
  detail: { type: String, default: '' },
  creator: { type: UserSchema, required: true },
  user: { type: UserSchema, required: 'userid is required' },
  projectId: { type: String, required: 'projectid is required' },
  taskState: { type: Number, enum: [0, 1], default: 0 },
  documents: { type: [String], default: [] },
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