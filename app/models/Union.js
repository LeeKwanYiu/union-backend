'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const ApplicationListSchema = new Schema({
  listId: { type: Schema.Types.ObjectId, required: 'id is required' },
  user_id: { type: Schema.Types.ObjectId, required: 'id is required' }
})
const UnionSchema = new Schema({
  unionName: { type: String, required: 'name is required' },
  introduction: { type: String, default: '介绍一下你的社团' },
  userId: { type: [String] },
  createUserId: { type: String },
  adminUserId: { type: [String] },
  type: { type: [String], default: [] },
  applicationList: { type: [ApplicationListSchema], default: [] },
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
UnionSchema.set('toJSON', { getters: true, virtuals: true })
UnionSchema.set('toObject', { getters: true, virtuals: true })

UnionSchema.path('createdAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})
UnionSchema.path('updatedAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

module.exports = mongoose.model('Union', UnionSchema)