<template>
  <div class="discover">
    <Banners :banners="banners" />
    <button class="btn" @click="getRecommendSongs">每日推荐歌曲</button>
    <button class="btn" @click="getRecommendResource">每日推荐歌单</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Banners from './DiscoverBanners.vue'
import {
  _getBanner,
  _getRecommendSongs,
  _getRecommendResource
} from '@/api/discover'

const banners = ref(null)

onMounted(async () => {
  try {
    const res = await _getBanner()
    banners.value = res.banners
  }
  catch (err) {
    console.log('网络请求出错了')
  }
})

const getRecommendSongs = async () => {
  try {
    const res = await _getRecommendSongs()
    console.log(res)
  }
  catch (err) {
    console.log('网络请求出错了')
  }
}

const getRecommendResource = async () => {
  try {
    const res = await _getRecommendResource()
    console.log(res)
  }
  catch (err) {
    console.log('网络请求出错了')
  }
}
</script>

<style lang="less" scoped>
.discover {
  .btn {
    padding: 10px;
    margin: 10px;
    color: var(--color-black-white);
    background-color: var(--color-primary);
  }
}
</style>