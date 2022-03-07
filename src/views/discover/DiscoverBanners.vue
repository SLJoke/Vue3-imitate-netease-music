<template>
  <div class="discover-banners">
    <el-carousel :interval="4000" type="card" height="200px" trigger="click">
      <el-carousel-item v-for="item in banners" :key="item">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
defineProps({
  banners: {
    type: Array
  }
})
</script>

<style lang="less" scoped>
.discover-banners {
  padding: 10px 30px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>