<template>
  <div class="layout-index">
    <LayoutHeader />
    <div class="layout-main">
      <LayoutSideBar />
      <router-view class="layout-router-view" />
    </div>
    <div class="layout-footer">
      <AudioPlayer
        :song-url="currentSong.url"
        :pic-url="currentSong.picUrl"
        :song-name="currentSong.name"
        :singer="currentSong.singer"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AudioPlayer from '@/components/AudioPlayer.vue'
import LayoutHeader from './Header.vue'
import LayoutSideBar from './SideBar.vue'

const store = useStore()

const currentSong = computed(() => store.state.currentSong)
</script>

<style lang="less" scoped>
.layout-index {
  .layout-main {
    display: flex;
    .layout-router-view {
      flex: 1;
      height: calc(100vh - 120px);
      overflow: hidden;
    }
  }
  .layout-footer {
    height: 65px;
    overflow: hidden;
    background-color: #ffffff;
    border-top: 1px solid #d1d1d1;
  }
}
</style>