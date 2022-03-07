<template>
  <div class="music-player">
    <div class="left">
      <div class="wrapper" v-if="songUrl !== ''">
        <img :src="picUrl" class="pic" alt />
        <div class="txt">
          <p class="song">{{ songName }}</p>
          <p class="singer">{{ singer }}</p>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="music-previous">
        <i class="iconfont icon-previous"></i>
      </div>
      <div class="music-play" @click="onPlay">
        <i class="iconfont" :class="
          isplay ? 'icon-pause' : 'icon-play'
        "></i>
      </div>
      <div class="music-next">
        <i class="iconfont icon-next"></i>
      </div>
    </div>
    <div class="right"></div>
  </div>
  <audio
    ref="audioPlayerRef"
    :src="songUrl"
    @ended="onEnd"
    autoplay></audio>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
defineProps({
  songUrl: {
    type: String,
    default: ''
  },
  picUrl: {
    type: String,
    default: ''
  },
  songName: {
    type: String,
    default: ''
  },
  singer: {
    type: String,
    default: ''
  }
})

const audioPlayerRef = ref()
const store = useStore()

const isplay = computed(() => store.state.playing)

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

const onEnd = () => {
  setPlayStatus(false)
}

const setPlayStatus = status => {
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