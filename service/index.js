const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
const {connect, initSchemas} = require('./database/init')

app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user')

// 装载所有路由
let router = new Router()
router.use('/user', user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect()
  initSchemas()
})()

app.use(async (ctx) => {
  ctx.body = '<h1>hello koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
