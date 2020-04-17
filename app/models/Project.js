'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const ProjectSchema = new Schema({
  projectName: { type: String, required: true },
  unionId: { type: Schema.Types.ObjectId, required: true },
  creator: { type: String, required: true },
  taskNum: { type: Number, default: 0 },
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