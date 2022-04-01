<template>
  <Layout />
</template>

<script setup>
import Layout from '@/layout/Index.vue'
</script>

<style>
@import "@/assets/css/base.css";

#app {
  height: calc(100% - 10px);
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.el-loading-spinner .circular .path {
  stroke: #ec4141;
}
/* transition 组件过渡的动画 */
/* .slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(50px);
  opacity: 0;
} */
</style>
