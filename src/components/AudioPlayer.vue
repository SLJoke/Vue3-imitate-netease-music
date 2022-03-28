<template>
  <div class="music-player">
    <div class="left">
      <div class="wrapper" v-if="currentSong.picUrl !== undefined">
        <img :src="currentSong.picUrl + '?param=224y224'" class="pic">
        <div class="txt">
          <p class="song">{{ currentSong.name }}</p>
          <p class="singer">{{ currentSong.singer }}</p>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="music-previous" @click="onPrevious">
        <i class="iconfont icon-previous"></i>
      </div>
      <div class="music-play" @click="onPlay">
        <i class="iconfont" :class="
          playing ? 'icon-pause' : 'icon-play'
        "></i>
      </div>
      <div class="music-next" @click="onNext">
        <i class="iconfont icon-next"></i>
      </div>
    </div>
    <div class="right"></div>
  </div>
  <audio
    ref="audioPlayerRef"
    :src="currentSong.url"
    @playing="onPlaying"
    @ended="onEnd"
    autoplay
  ></audio>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const audioPlayerRef = ref()
const store = useStore()

const playing = computed(() => store.state.playing)
const currentSong = computed(() => store.state.currentSong)
const playlists = computed(() => store.state.playlist)
const currentIndex = computed(() => playlists.value.findIndex(item => item.id === currentSong.value.id))

const onPrevious = () => {
  console.log('previous')
  let prevIndex = currentIndex.value - 1
  if (prevIndex < 0) {
    prevIndex = playlists.value.length - 1
  }
  store.commit('setCurrentSong', playlists.value[prevIndex])
}

const onPlay = () => {
  const status = audioPlayerRef.value.paused
  if (audioPlayerRef.value.readyState !== 0) {
    switch (status) {
      case true:
        audioPlayerRef.value.play()
        setPlayStatus(status)
        break
      case false:
        audioPlayerRef.value.pause()
        setPlayStatus(status)
    }
  }
  else {
    ElMessage.error('当前无音乐播放')
  }
}

const onNext = () => {
  console.log('next')
  let nextIndex = currentIndex.value + 1
  if (nextIndex > playlists.value.length - 1) {
      nextIndex = 0
    }
  store.commit('setCurrentSong', playlists.value[nextIndex])
}

const onPlaying = () => {
  setPlayStatus(true)
}

const onEnd = () => {
  setPlayStatus(false)
  onNext()
}

const setPlayStatus = (status) => {
  store.commit('setPlayingStatus', status)
}
</script>

<style lang="less" scoped>
.music-player {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 250px;
    height: 100%;
    padding-left: 10px;

    .wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .pic {
        height: 80%;
        aspect-ratio: 1 / 1;
        border-radius: 5px;
      }
      .txt {
        margin-left: 5px;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .song {
          font-size: 16px;
          color: #111111;
          margin-bottom: 5px;
        }
        .singer {
          font-size: 12px;
          color: #323232;
        }
      }
    }
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    .music-play {
      margin: 0 40px;
      padding: 12px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f4f4f4;
      &:hover {
        background-color: #e5e5e5;
      }
    }
    .iconfont {
      color: #333333;
    }
  }
  .right {
    width: 250px;
  }
}
</style>