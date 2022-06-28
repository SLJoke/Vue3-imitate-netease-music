<template>
  <transition name="slide" mode="out-in">
    <div class="full-player" v-if="currentSong">
      <div class="full-player-record">
        <div class="record-wrap" :style="isRotate">
          <div class="record">
            <img :src="currentSong.picUrl + '?param=224y224'">
          </div>
        </div>
      </div>
      <div class="full-player-lyric">
        <div class="song">
          <p class="song-name">{{ currentSong.name }}</p>
          <p class="singer">歌手：{{ currentSong.singer }}</p>
        </div>
        <div class="lyric-wrap">
          <div>
            <div class="lyric-item" v-for="item in lyric">
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { _getLyric } from '@/api/songs'
import { useStore } from 'vuex'

const lyric = ref()
const store = useStore()
const currentSong = computed(() => store.state.currentSong)
const currentSongId = computed(() => store.state.currentSong?.id)
const isRotate = computed(() => {
  return {
    animationPlayState: store.state.playing ? 'running' : 'paused',
  }
})

onMounted(() => {
  getLyric()
})

watch(currentSongId, () => getLyric())

const getLyric = async () => {
  if (currentSong.value) {
    const { lrc } = await _getLyric(currentSong.value?.id)
    lyric.value = formatLyric(lrc.lyric)
  }
}

function formatLyric(lrc) {
  const formatLrc = lrc.replace(/\[\d*:\d*.\d*\]/g, '')
  return formatLrc.split('\n')
}
</script>

<style lang="less" scoped>
.full-player {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  background-color: #fff;
  z-index: 998;

  &-record {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .record-wrap {
      width: 265px;
      height: 265px;
      border-radius: 50%;
      background-color: rgba(100, 100, 100, .2);
      display: flex;
      justify-content: center;
      align-items: center;
      animation: rot 50s linear infinite;

      .record {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        // background-color: rgba(0, 0, 0, .9);
        background: linear-gradient(-45deg, #333540, #070708, #333540);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 170px;
        height: 170px;
        border-radius: 50%;
      }
    }
  }


  &-lyric {
    padding: 40px 0;
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .song {
      margin-bottom: 30px;

      &-name {
        font-size: 20px;
        font-weight: bold;
      }

      .singer {
        font-size: 12px;
      }
    }

    // overflow: hidden;
    // box-shadow: 0 0 20px #000;
    .lyric-wrap {
      flex: 1;
      overflow-y: scroll;
      font-size: 14px;
      color: #8e8e8e;
    }
  }
}

@keyframes rot {
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
}
</style>