const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = '用户操作首页'
})
router.post('/register', async (ctx) => {
  // 取得Model
  const User = mongoose.model('User')
  // 把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      msg: 'success'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      msg: error
    }
  })
})

module.exports = router
