'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const ApplicationListSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: val => moment(val).format('YYYY-MM-DD HH:mm:ss')
  }
})
const UnionSchema = new Schema({
  unionName: { type: String, required: 'name is required' },
  introduction: { type: String, default: '介绍一下你的社团' },
  userId: { type: [String] },
  creator: { type: String },
  adminUsers: { type: [String] },
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
    },
    id: false
  })

UnionSchema.virtual('unionId').get(function () {
  return this._id.toString()
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