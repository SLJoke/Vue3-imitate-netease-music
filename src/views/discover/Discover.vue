<template>
  <div class="discover">
    <div class="discover-container">
      <Banners :banners="banners" />
      <Resource :resource="recResource" />
      <!-- <button class="btn" @click="getRecommendSongs">每日推荐歌曲</button>
      <button class="btn" @click="getPersonalized">每日推荐歌单</button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Banners from './DiscoverBanners.vue'
import Resource from './DiscoverResource.vue'
import {
  _getBanner,
  _getRecommendSongs,
  _getPersonalized
} from '@/api/discover'

const banners = ref(null)
const recResource = ref(null)

onMounted(() => {
  getBanners()
  getPersonalized()
})

const getBanners = async () => {
  try {
    const res = await _getBanner()
    banners.value = res.banners
  }
  catch (err) {
    console.log('网络请求出错了')
  }
}

const getRecommendSongs = async () => {
  try {
    const res = await _getRecommendSongs()
    console.log(res)
  }
  catch (err) {
    console.log('网络请求出错了')
  }
}

const getPersonalized = async () => {
  try {
    const res = await _getPersonalized()
    recResource.value = res.result
  }
  catch (err) {
    console.log('网络请求出错了')
  }
}
</script>

<style lang="less" scoped>
.discover {
  padding: 0 30px;
  overflow-y: scroll;
  .discover-container {
    height: max-content;
    .btn {
      padding: 10px;
      margin: 10px;
      color: var(--color-black-white);
      background-color: var(--color-primary);
    }
  }
}
</style>