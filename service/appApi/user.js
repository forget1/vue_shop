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
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password
  const User = mongoose.model('User')
  await User.findOne({userName: userName}).exec().then(async (res) => {
    if (res) {
      let newUser = new User()
      await newUser.comparePassword(password, res.password).then((isMatch) => {
        ctx.body = {
          code: 200,
          msg: isMatch
        }
      }).catch(error => {
        ctx.body = {
          code: 500,
          msg: error + 'dsa'
        }
      })
    } else {
      ctx.body = {
        code: 200,
        msg: '用户名不存在'
      }
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      msg: error + 'asd'
    }
  })
})

module.exports = router
