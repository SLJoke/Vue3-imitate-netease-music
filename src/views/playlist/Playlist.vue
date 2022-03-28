<template>
  <div class="playlist">
    <div v-if="playlist" class="playlist-container">
      <div class="header">
        <img :src="playlist.coverImgUrl + '?param=512y512'" class="cover-img" />
        <div class="title-and-description">
          <span class="title">{{ playlist.name }}</span>
          <div class="creator">
            <!-- <img :src="playlist.creator.avatarUrl" class="avatar"> -->
            <span class="name">Playlist by {{ playlist.creator.nickname }}</span>
            <span
              class="create-time"
            >创建于{{ formatDate(playlist.createTime) }} · {{ playlist.trackCount }}首歌</span>
          </div>
          <div class="description">
            <span>{{ playlist.description }}</span>
          </div>
        </div>
      </div>
      <div
        v-for="item in playlist.tracks"
        :key="item.id"
        class="text item"
        :class="item.id === currentSong.id ? 'focus' : ''"
        @click="setSongPlay(item.id)"
      >
        <img :src="item.al.picUrl + '?param=224y224'" class="pic" />
        <div class="title-and-artist">
          <div class="title">
            <span>{{ item.name }}</span>
          </div>
          <div class="artist">
            <span v-for="ar in item.ar">{{ ar.name }}</span>
          </div>
        </div>
        <div class="album">
          <span>{{ item.al.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { _getPlaylist } from '@/api/songs'
import { setSongPlay, formatDate } from '@/utils/utils'

const route = useRoute()
const store = useStore()
const playlist = ref()
const pid = computed(() => route.params.pid)
const currentSong = computed(() => store.state.currentSong)

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
    .header {
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 20px;
      .cover-img {
        width: 100%;
        border-radius: 12px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        aspect-ratio: 1 / 1;
      }
      .title-and-description {
        .title {
          font-size: 30px;
          font-weight: 600;
        }
        .creator {
          display: flex;
          flex-direction: column;
          .avatar {
            width: 40px;
            border-radius: 50%;
          }
          .name {
            font-size: 18px;
            opacity: 0.88;
            margin-top: 24px;
          }
          .create-time,
          .count {
            font-size: 14px;
            opacity: 0.68;
            margin-top: 2px;
          }
        }
        .description {
          font-size: 14px;
          opacity: 0.68;
          margin-top: 24px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
    .item.focus {
      background-color: #eaeffd;
    }
    .item {
      padding: 8px;
      display: flex;
      align-items: center;
      border-radius: 12px;
      &:hover {
        background-color: #f5f5f7;
      }
      .pic {
        width: 46px;
        aspect-ratio: 1 / 1;
        border-radius: 8px;
        margin-right: 20px;
      }
      .title-and-artist {
        flex: 1;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 18px;
          font-weight: 600;
          padding-right: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          word-break: break-all;
        }
        .artist {
          margin-top: 2px;
          font-size: 13px;
          opacity: 0.68;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      .album {
        flex: 1;
        font-size: 16px;
        opacity: 0.88;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>