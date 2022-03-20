<template>
  <div class="discover-resource">
    <div v-if="resource">
      <el-card class="box-card" body-style>
        <template #header>
          <div class="card-header">
            <span>推荐歌单</span>
          </div>
        </template>
        <div
          v-for="item in resource"
          :key="item.id"
          class="text item"
          @click="onClickResource(item.id)"
        >
          <img :src="item.picUrl" width="50">
          {{ item.name }}
        </div>
      </el-card>
    </div>
    <div v-else>需要登录</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps(['resource'])
const router = useRouter()
const onClickResource = (pid) =>  router.push(`/playlist/${pid}`)
</script>

<style lang="less" scoped>
</style>