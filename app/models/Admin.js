'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
const AdminSchema = new Schema({
  // adminId: { type: Schema.Types.ObjectId, required: 'id is required' }, // 用户ID
  name: { type: String, required: 'studentNum is required' },  // 学生号
  password: { type: String },
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
AdminSchema.set('toJSON', { getters: true, virtuals: true })
AdminSchema.set('toObject', { getters: true, virtuals: true })

AdminSchema.virtual('adminId').get(function () {
  return this._id.toString()
})

AdminSchema.path('createdAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})
AdminSchema.path('updatedAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})


module.exports = mongoose.model('Admin', AdminSchema) 