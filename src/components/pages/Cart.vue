<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"/>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="yang-row" v-for="(item, index) in cartInfo" :key="index">
        <div class="yang-img">
          <img :src="item.image" width="100%">
        </div>
        <div class="yang-text">
          <div class="yang-goods-name">{{item.name}}</div>
          <div class="yang-control">
            <van-stepper v-model="item.count"/>
          </div>
        </div>
        <div class="yang-goods-price">
          <div>
            ￥{{item.price | moneyFilter}}
          </div>
          <div>
            x{{item.count}}
          </div>
          <div>
            ￥{{item.price * item.count | moneyFilter}}
          </div>
        </div>
      </div>
    </div>
    <!-- 显示总金额 -->
    <div class="totalMoney">
      商品总价：￥{{totalMoney | moneyFilter}}
    </div>
    <!-- 清空购物车 -->
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart">清空购物车</van-button>
    </div>
  </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  data () {
    return {
      cartInfo: [],
      isEmpty: false
    }
  },
  created () {
    this.getCartInfo()
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  computed: {
    totalMoney () {
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  methods: {
    getCartInfo () {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      this.isEmpty = this.cartInfo.length > 0
    },
    clearCart () {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    }
  }
}
</script>

<style scoped>
  .cart-list {
    background-color: #fff;
  }
  .yang-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #e4e7ed;
  }
  .yang-img {
    flex: 6;
  }
  .yang-text {
    flex: 16;
    padding-left: 10px;
  }
  .yang-control {
    padding-top: 10px;
  }
  .yang-goods-price {
    flex: 4;
    text-align: right;
  }
  .totalMoney {
    text-align: right;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
  }
  .card-title {
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
    text-align: right;
  }
</style>
