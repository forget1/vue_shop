const BASEURL = 'http://mock-api.com/lzjAWVK4.mock/vue_shop'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL,
  getGoodsInfo: BASEURL + '/getGoodsInfo',
  registerUser: LOCALURL + 'user/register',
  login: LOCALURL + 'user/login',
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo'
}

module.exports = URL
