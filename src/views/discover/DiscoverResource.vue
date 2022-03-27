<template>
  <div class="discover-resource">
    <div class="card-header">
      <span>推荐歌单</span>
    </div>
    <div v-if="resource" class="card-main">
      <div
        v-for="item in resource"
        :key="item.id"
        class="text item"
        @click="onClickResource(item.id)"
      >
        <span class="play-count">
          <i class="iconfont icon-play1"></i>
          {{ formatPlayCount(item.playCount) }}
        </span>
        <img :src="item.picUrl" class="pic"/>
        <span class="title">{{ item.name }}</span>
      </div>
    </div>
    <div v-else>网络请求出错了</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { formatPlayCount } from '@/utils/utils'
defineProps(['resource'])
const router = useRouter()
const onClickResource = (pid) => router.push(`/playlist/${pid}`)
</script>

<style lang="less" scoped>
.discover-resource {
  padding: 20px 0;
  .card-header {
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .card-main {
    display: grid;
    // 列宽
    grid-template-columns: repeat(5, 18.4%);
    // 行高
    // grid-template-rows: repeat(auto-fill, 18.4%);
    gap: 20px 2%;
    .item {
      position: relative;
      .play-count {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        color: #ffffff;
        font-size: 12px;
        display: block;
        line-height: 30px;
        text-align: end;
        padding: 0 8px;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.4),
          rgba(255, 255, 255, 0.01)
        );
        border-radius: 8px 8px 0 0;
        .icon-play1 {
          font-size: 14px;
        }
      }
      .pic {
        width: 100%;
        border-radius: 8px;
      }
      .title {
        font-size: 14px;
      }
    }
  }
}
</style>