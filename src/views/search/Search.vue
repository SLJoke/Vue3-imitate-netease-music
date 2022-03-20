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
import { setSongPlay, setSinger } from '@/utils/utils'

const store = useStore()
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
  songLists.value = null
  const res = await _getSearch(keywords.value)
  
  songLists.value = res.result.songs
}

// const setSongPlay = async (id) => {
//   // const res = await _getSongUrl(id)
//   // const { url } = res.data[0]
//   const details = await _getSongDetails(id)
//   const { al, ar, name } = details.songs[0]
//   const songs = {
//     id,
//     url: songUrlOuter(id),
//     picUrl: al.picUrl,
//     name: name,
//     singer: setSinger(ar)
//   }
//   store.commit('setCurrentSong', songs)
//   store.commit('setPlayList', songs)
// }

// function songUrlOuter(id) {
//   return `http://music.163.com/song/media/outer/url?id=${id}.mp3`
// }

// function setSinger(items) {
//   let arr = []
//   items.forEach(item => {
//     arr.push(item.name)
//   })
//   return arr.join('/')
// }
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