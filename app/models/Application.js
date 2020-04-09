const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const ApplicationSchema = new Schema({
  unionName: { type: String, required: true },
  creator: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: [String], required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ApplicationSchema.set('toJSON', { getters: true, virtuals: true })
ApplicationSchema.set('toObject', { getters: true, virtuals: true })

ApplicationSchema.virtual('id').get(function () {
  return this._id.toString()
})

ApplicationSchema.path('createdAt').get(function (v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

module.exports = mongoose.model('Application', ApplicationSchema)