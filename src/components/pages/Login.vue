<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" @click="LoginAction" :loading="openLoading" size="large">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
export default {
  data () {
    return {
      username: '',
      password: '',
      openLoading: false,
      usernameErrorMsg: '',
      passwordErrorMsg: ''
    }
  },
  created () {
    if (localStorage.userInfo) {
      Toast.success('您已经登录')
      this.$router.push('/member')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    checkForm () {
      let isOK = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能少于5位'
        isOK = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOK = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOK
    },
    axiosLoginUser () {
      this.openLoading = true
      axios({
        url: url.login,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.msg) {
          new Promise((resolve, reject) => {
            localStorage.userInfo = {userName: this.username}
            setTimeout(() => {
              resolve()
            }, 500)
          }).then(() => {
            Toast.success('login success')
            this.openLoading = false
            this.$router.push('/member')
          }).catch(err => {
            Toast.fail('save login state fail')
            console.log(err)
          })
        } else {
          Toast.fail('login fail')
          this.openLoading = false
        }
      }).catch(error => {
        console.log(error)
        Toast.fail('login fail')
        this.openLoading = false
      })
    },
    LoginAction () {
      this.checkForm() && this.axiosLoginUser()
    }
  }
}
</script>

<style scoped>
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
  }
  .register-button {
    padding-top: 10px;
  }
</style>
