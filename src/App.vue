<template>
  <Layout />
</template>

<script setup>
import Layout from '@/layout/Index.vue'
</script>

<style>
@import "@/assets/css/base.css";

#app {
  height: 100%;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-loading-spinner .circular .path {
  stroke: #ec4141;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
  transform: none;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
