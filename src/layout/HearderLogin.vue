<template>
  <div class="header-login">
    <div v-if="!isLogged" class="user-info">
      <i class="iconfont icon-user-empty"></i>
      <button class="nickname" @click="modalOpen = true">未登录</button>
    </div>
    <div v-else>
      <el-dropdown trigger="click" @command="onLogout">
        <span class="el-dropdown-link user-info">
          <img class="avatar" :src="userInfo.avatarUrl" alt />
          <span class="nickname">{{ userInfo.nickname }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <teleport to="body">
      <div class="login-form" v-if="modalOpen">
        <div class="login-input">
          <input class="input login-phone" type="text" v-model="teleNumber" placeholder="请输入手机号码" />
          <div class="divider"></div>
          <input
            class="input login-password"
            type="password"
            v-model="telePassword"
            placeholder="请输入密码"
          />
        </div>
        <button class="login-button" @click="login">登录</button>
        <button class="login-button" @click="modalOpen = false">exit</button>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { _cellphoneLogin, _logout } from '@/api/user'
import { setCookies, clearCookies } from '@/utils/utils'
const store = useStore()
const state = reactive({
  modalOpen: false,
  teleNumber: '',
  telePassword: '',
  userInfo: JSON.parse(localStorage.getItem('user_info')) || ''
})

const isLogged = computed(() => store.state.isLogged)

const login = async (e) => {
  e.preventDefault()
  state.modalOpen = false
  const phone = state.teleNumber.trim()
  const password = state.telePassword.trim()
  if (phone && password) {
    try {
      const res = await _cellphoneLogin(phone, password)
      if (res.code === 200) {
        state.userInfo = res.profile
        localStorage.setItem('user_info', JSON.stringify(res.profile))
        store.commit('setLoginStatus', true)
        setCookies(res.cookie)
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
      } else {
        ElMessage.error('密码错误')
      }
    }
    catch (err) {
      console.log(err)
      ElMessage.error(err)
    }
  }
  else return ElMessage.error('账号格式输入有误')
}

const onLogout = () => {
  _logout().then((res) => {
    console.log(res)
    ElMessage({
      message: '已退出登录',
      type: 'success',
    })
    store.commit('setLoginStatus', false)
    localStorage.pxoveItem('user_info')
    clearCookies()
  })
}

const { modalOpen, teleNumber, telePassword, userInfo } = toRefs(state)
</script>

<style lang="less" scoped>
.header-login {
  .user-info {
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 30px;
      color: #eee;
      background-color: #ccc;
      border-radius: 50%;
      margin-right: 10px;
    }
    .avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
    }
    .nickname {
      color: var(--color-black-white);
    }
  }
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  background-color: #fff;

  padding: 45px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  .login-input {
    width: 300px;
    border: 1px solid var(--color-thin);
    border-radius: 10px;
    overflow: hidden;
    .input {
      width: 100%;
      padding: 15px;
    }
    .divider {
      width: 100%;
      height: 1px;
      background-color: var(--color-thin);
    }
  }
  .login-button {
    width: 100%;
    border-radius: 5px;
    color: #fff;
    padding: 8px;
    margin: 10px;
    background-color: var(--color-primary);
  }
}
</style>