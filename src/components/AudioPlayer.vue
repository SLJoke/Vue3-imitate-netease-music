<template>
  <div class="music-player">
    <div class="left">
      <div class="wrapper" v-if="currentSong">
        <div class="pic-wrap" @click="store.commit('setIsFullShow', !isFullShow)">
          <div class="mask">
            <i class="iconfont"
              :class="isFullShow ? 'icon-bottom': 'icon-top'"></i>
          </div>
          <img :src="currentSong.picUrl + '?param=224y224'" class="pic">
        </div>
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
    <div class="right">
      <div v-if="currentSong" class="progress-wrap">
        <input type="range" class="progress-bar" :style="{
          background: `-webkit-linear-gradient(top, var(--color-primary), var(--color-primary))
                  0% 0% / ${currentTime / currentSong?.duration * 100}% 100% no-repeat`
        }" :value="currentTime" :max="currentSong?.duration" @input="progressChange">
        <div class="current-total">
          <span>{{ handleTime(currentTime) }}</span>
          /
          <span>{{ handleTime(currentSong?.duration) }}</span>
        </div>
      </div>
    </div>
  </div>
  <audio ref="audioPlayerRef" :src="currentSong?.url" @canplay="canplay" @timeupdate="timeupdate"
    @play="setPlayStatus(true)" @pause="setPlayStatus(false)" @ended="end"></audio>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const audioPlayerRef = ref()
const store = useStore()
const currentTime = ref(0)

const playing = computed(() => store.state.playing)
const isFullShow = computed(() => store.state.isFullShow)
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

const canplay = () => {
  if (currentSong) {
    audioPlayerRef.value.play()
    document.title = `${currentSong.value.name} — ${currentSong.value.singer}`
  }
}

const timeupdate = () => {
  currentTime.value = Math.floor(audioPlayerRef.value.currentTime)
}

const progressChange = (e) => {
  audioPlayerRef.value.currentTime = e.target.value
}

const end = () => {
  setPlayStatus(false)
  onNext()
}

const setPlayStatus = (status) => {
  store.commit('setPlayingStatus', status)
}
function handleTime(t) {
  const ft = Math.floor(t)
  const fm = Math.floor(ft / 60)
  const fs = ft % 60
  return ((fm < 10 ? `0${fm}` : fm) + ':' + (fs < 10 ? `0${fs}` : fs))
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

      .pic-wrap {
        height: 80%;
        position: relative;
        .mask {
          width: 100%;
          height: 100%;
          backdrop-filter: blur(2px);
          background-color: rgba(0, 0, 0, .3);
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont {
            color: #fff;
            font-size: 20px;
          }
        }
        .pic {
            height: 100%;
            aspect-ratio: 1 / 1;
            // border-radius: 5px;
          }
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
    height: 100%;

    .progress-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .current-total {
        font-size: 14px;
        color: #b4b4b4;
        margin-bottom: -10px;
      }

      .progress-bar {
        width: 80%;
        height: 4px;
        background-color: rgb(229, 229, 229) !important;
        /* 清除input range默认样式 */
        -webkit-appearance: none;
        border-radius: 10px;
        transition: none;
        margin-bottom: 10px;
      }

      /* 清除进度条滑轨样式 */
      .progress-bar::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 10px;
        width: 10px;
        background-color: var(--color-primary);
        border-radius: 50%;
      }
    }
  }
}
</style>