<template>
  <div class="layout-header">
    <!-- 左边logo -->
    <div class="left">
      <i class="iconfont icon-logo"></i>
      <span>音乐啊</span>
    </div>

    <!-- 中间页面前进后退和搜索框 -->
    <div class="center">
      <div class="search">
        <button class="icon" @click="goTo(-1)">
          <i class="iconfont icon-left"></i>
        </button>
        <button class="icon" @click="goTo(1)">
          <i class="iconfont icon-right"></i>
        </button>
        <SearchForm @search-with-form="searchWithForm" />
      </div>
      <LoginForm />
    </div>

    <!-- 右边换肤 放大 缩小 -->
    <div class="right">
      <i class="iconfont icon-theme" @click="modifyTheme"></i>
      <i class="divider"></i>
      <i class="iconfont icon-move" @click="exitFullScreen"></i>
      <i class="iconfont icon-square" @click="fullScreen"></i>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SearchForm from './HeaderSearch.vue'
import LoginForm from './HearderLogin.vue'

const router = useRouter()

const fullScreen = () => {
  document.documentElement.requestFullscreen()
}

const exitFullScreen = () => {
  // 判断是否存在全屏的节点,若没有返回null
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
}

const goTo = (to) => {
  router.go(to)
}

const searchWithForm = ({ $event, keywords }) => {
  $event.preventDefault()
  if(!keywords === false)
  router.push({ path: `/search/${keywords}` })
}

const modifyTheme = () => {
  document.documentElement.classList.toggle('white')
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 55px;
  display: flex;
  background-color: var(--color-primary);

  .left {
    width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon-logo {
      padding: 6px;
      border-radius: 50%;
      font-size: 20px;
      color: var(--color-primary);
      background-color: var(--color-thin);
    }

    span {
      padding: 0 8px;
      font-size: 20px;
      color: var(--color-black-white);
    }
  }

  .center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    .search {
      display: flex;
      align-items: center;
      .icon {
        display: inline-flex;
        color: var(--color-black-white);
        background-color: rgba(100, 100, 100, 0.1);
        padding: 5px;
        margin-right: 10px;
        border-radius: 50%;
        &:nth-child(1) {
          margin-left: 30px;
        }
        .iconfont {
          font-size: 12px;
        }
      }
    }
  }

  .right {
    width: 170px;
    color: var(--color-black-white);
    padding-right: 10px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    .divider {
      width: 1px;
      height: 16px;
      background-color: var(--color-black-white);
    }
  }
}
</style>