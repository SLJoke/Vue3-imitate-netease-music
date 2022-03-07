<template>
  <div class="search">
    <h1 class="search-header">搜索 {{ keywords }}</h1>
    <div class="search-main">
      <div
        class="song-info"
        v-for="(item, index) in songLists"
        :key="item.id"
        @click="setSongPlay(item.id)"
      >
        {{ index + 1 }}、  {{ item.name }} --- {{ setSinger(item.artists) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  _getSearch,
  _getSongUrl,
  _getSongDetails
} from '@/api/songs'
import { ElMessage } from 'element-plus'

const store = useStore()
const route = useRoute()
const songLists = ref(null)
const keywords = computed(() => route.params.keywords)

onMounted(() => {
  getSongs()
})

watch(keywords, () => {
  getSongs()
})

const setSinger = (items) => {
  let arr = []
  items.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

const getSongs = async () => {
  songLists.value = null
  const res = await _getSearch(keywords.value)
  
  songLists.value = res.result.songs
}

const setSongPlay = async (id) => {
  const res = await _getSongUrl(id)
  const { url } = res.data[0]
  const details = await _getSongDetails(id)
  const { al, ar, name } = details.songs[0]
  
  if (url !== null) {
    store.commit('setCurrentSong', {
      url: url,
      picUrl: al.picUrl,
      name: name,
      singer: setSinger(ar)
    })
    store.commit('setPlayingStatus', true)
  }
  else {
    ElMessage.error('音乐不能播放!')
  }
}
</script>

<style lang="less" scoped>
.search {
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
}
</style>