<template>
  <div class="playlist">
    <div class="playlist-container">
      <div v-if="playlist">
        <el-card class="box-card" body-style>
          <template #header>
            <div class="card-header">
              <span>{{ playlist.name }}</span>
            </div>
          </template>
          <div
            v-for="item in playlist.tracks"
            :key="item.id"
            class="text item"
            @click="setSongPlay(item.id)"
          >
            <img :src="item.al.picUrl" width="50" />
            {{ item.name }}
          </div>
        </el-card>
      </div>
      <div v-else>需要登录</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { _getPlaylist } from '@/api/songs'
import { setSongPlay } from '@/utils/utils'

const route = useRoute()
const playlist = ref()
const pid = computed(() => route.params.pid)

onMounted(() => {
  getPlaylist()
})

watch(pid, () => {
  if (pid.value !== undefined)
    getPlaylist()
})

const getPlaylist = async () => {
  const res = await _getPlaylist(pid.value)
  playlist.value = res.playlist
}
</script>

<style lang="less" scoped>
.playlist {
  padding: 20px 30px;
  overflow-y: scroll;
  .playlist-container {
    height: max-content;
  }
}
</style>