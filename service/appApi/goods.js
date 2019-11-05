const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('数据库写入失败')
    } else {
      data = JSON.parse(data)
      let saveCount = 0
      const Goods = mongoose.model('Goods')
      data.map((value) => {
        let newGoods = new Goods(value)
        newGoods.save().then(() => {
          saveCount++
          console.log('success ' + saveCount)
        }).catch(err => {
          console.log('fail ' + err)
        })
      })
    }
  })
  ctx.body = '开始导入商品详情数据'
})

router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('数据库写入失败')
    } else {
      data = JSON.parse(data)
      let saveCount = 0
      const Category = mongoose.model('Category')
      data.RECORDS.map((value) => {
        let newCategory = new Category(value)
        newCategory.save().then(() => {
          saveCount++
          console.log('success ' + saveCount)
        }).catch(err => {
          console.log('fail ' + err)
        })
      })
    }
  })
  ctx.body = '开始导入商品大类数据'
})

router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      data = JSON.parse(data)
      let saveCount = 0
      const CategorySub = mongoose.model('CategorySub')
      data.RECORDS.map((value) => {
        let newCategorySub = new CategorySub(value)
        newCategorySub.save().then(() => {
          saveCount++
          console.log('success ' + saveCount)
        }).catch(err => {
          console.log('fail ' + err)
        })
      })
    }
  })
  ctx.body = '开始导入商品子类数据'
})

// 获取商品详情
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ID: goodsId}).exec()
    ctx.body = { code: 200, msg: result }
  } catch (err) {
    ctx.body = { code: 500, msg: err }
  }
})

module.exports = router
