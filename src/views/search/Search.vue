<template>
  <div class="search">
    <h1 class="search-header">搜索 {{ keywords }}</h1>
    <div v-if="songLists" class="search-main">
      <div
        class="song-info"
        v-for="(item, index) in songLists"
        :key="item.id"
        @click="setSongPlay(item.id)"
      >{{ index + 1 }}、 {{ item.name }} --- {{ setSinger(item.artists) }}</div>
    </div>
    <div v-else class="error">暂无结果</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  _getSearch,
  _getSongUrl,
  _getSongDetails
} from '@/api/songs'
import { setSongPlay, setSinger } from '@/utils/utils'

const route = useRoute()
const songLists = ref(null)
const keywords = computed(() => route.params.keywords)

onMounted(() => {
  getSongs()
})

watch(keywords, () => {
  if (keywords.value !== undefined)
    getSongs()
})

const getSongs = async () => {
  try {
    songLists.value = null
    const res = await _getSearch(keywords.value)
    songLists.value = res.result.songs
  }
  catch {

  }
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  .search-header {
    height: 55px;
    padding: 0 30px;
  }
  .search-main {
    height: calc(100% - 55px);
    padding: 0 30px;
    overflow-y: scroll;
    .song-info {
      margin: 10px 0;
    }
  }
  .error {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 26px;
    font-size: 600;
    opacity: .48;
    text-align: center;
  }
}
</style>