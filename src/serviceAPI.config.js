const BASEURL = 'http://mock-api.com/lzjAWVK4.mock/vue_shop'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL,
  getGoodsInfo: BASEURL + '/getGoodsInfo',
  registerUser: LOCALURL + 'user/register'
}

module.exports = URL
