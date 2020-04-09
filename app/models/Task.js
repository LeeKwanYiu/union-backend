'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const ProjectSchema = new Schema({
  taskId: { type: Schema.Types.ObjectId, required: 'id is required' }, // 用户ID
  taskName: { type: String, required: 'name is required' },
  taskDetail: { type: String, required: '请填写相应的任务内容' },
  userId: { type: Schema.Types.ObjectId, required: 'userid is required' },
  projectId: { type: Schema.Types.ObjectId, required: 'projectid is required' },
  taskState: { type: Number, enum: [0, 1], default: 0 },
  taskContent: { type: String },
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
ProjectSchema.set('toJSON', { getters: true, virtuals: true })
ProjectSchema.set('toObject', { getters: true, virtuals: true })

ProjectSchema.path('createdAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})
ProjectSchema.path('updatedAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

module.exports = mongoose.model('Task', ProjectSchema)