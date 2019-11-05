<template>
  <div>
    <!-- search bar layout -->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon"></van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- Category of goods -->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- AD banner area -->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>
    <!-- Recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor one area -->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!-- hot area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row  gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goodsInfo :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfo>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
import {toMoney} from '@/filter/moneyFilter'
import url from '@/serviceAPI.config.js'
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require('../../assets/images/localtion.png'),
      bannerPicArray: [],
      category: [],
      adBanner: '',
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  components: { swiper, swiperSlide, floorComponent, goodsInfo },
  created () {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    }).then(res => {
      if (res.status === 200) {
        this.category = res.data.data.category
        this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS
        this.bannerPicArray = res.data.data.slides
        this.recommendGoods = res.data.data.recommend
        this.floor1 = res.data.data.floor1
        this.floor2 = res.data.data.floor2
        this.floor3 = res.data.data.floor3
        this.floorName = res.data.data.floorName
        this.hotGoods = res.data.data.hotGoods
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .search-bar {
    height: 2.5rem;
    background-color: #e5017d;
    line-height: 2.5rem;
    overflow: hidden;
  }
  .search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
  }
  .location-icon {
    width: 80%;
    padding-top: 0.2rem;
    padding-left: 0.3rem;
  }
  .swiper-area {
    width: 20rem;
    clear: both;
  }
  .type-bar {
    background-color: #fff;
    margin: 0 0.3rem 0.3rem 0.3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .type-bar div {
    padding: 0.3rem;
    font-size: 12px;
    text-align: center;
  }
  .recommend-area {
    background-color: #fff;
    margin-top: 0.3rem;
  }
  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 0.2rem;
    color: #e5017d;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
  }
  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .hot-goods {
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
  }
</style>
