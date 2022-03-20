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
    </div>
    <div class="layout-footer">
      <AudioPlayer />
    </div>
  </div>
</template>

<script setup>
import AudioPlayer from '@/components/AudioPlayer.vue'
import Header from './Header.vue'
import SideBar from './SideBar.vue'
</script>

<style lang="less" scoped>
.layout-index {
  .layout-main {
    display: flex;
    .layout-router-view {
      flex: 1;
      height: calc(100vh - 120px);
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