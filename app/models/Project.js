'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const ProjectSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, required: 'id is required' }, // 用户ID
  projectName: { type: String, required: 'name is required' },
  unionId: { type: Schema.Types.ObjectId, required: 'unionid is required' },
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

module.exports = mongoose.model('Project', ProjectSchema)