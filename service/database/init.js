const mongoose = require('mongoose')
const glob = require('glob')
const db = 'mongodb://localhost:27017/vue_shop'
const {resolve} = require('path')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
  mongoose.connect(db)
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log('**********数据库断开**********')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(new Error('disconnected'))
        throw new Error('数据连接断开')
      }
    })
    mongoose.connection.on('error', err => {
      console.log('**********数据库错误**********')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据连接失败')
      }
    })
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}
