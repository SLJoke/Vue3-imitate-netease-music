<template>
  <div class="layout-index">
    <Header />
    <div class="layout-main">
      <SideBar />
      <!--
        keep-alive vue3内置组件缓存子组件的状态
        当组件在 <keep-alive> 内被切换时，
        它的 mounted 和 unmounted 生命周期钩子不会被调用，
        取而代之的是 activated 和 deactivated
      -->
      <router-view class="layout-router-view" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <FullPlayer v-show="isShow" />
    </div>
    <div class="layout-footer">
      <AudioPlayer />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import FullPlayer from '@/components/FullPlayer.vue'
import Header from './Header.vue'
import SideBar from './SideBar.vue'
import { useStore } from 'vuex'
const store = useStore()
const isShow = computed(() => store.state.isFullShow)
</script>

<style lang="less" scoped>
.layout-index {
  height: 100%;
  overflow: hidden;

  .layout-main {
    height: calc(100% - 120px);
    display: flex;
    position: relative;

    .layout-router-view {
      flex: 1;
    }
  }

  .layout-footer {
    height: 65px;
    overflow: hidden;
    background-color: #ffffff;
    border-top: 1px solid #d1d1d1;
    position: relative;
    z-index: 999;
  }
}
</style>