<template>
  <div class="list">
    <div
        v-for="item in data"
        :key="item.id"
        class="text item"
        :class="item.id === currentSongId ? 'focus' : ''"
        @dblclick="$emit('dblplay', item.id)"
      >
        <img :src="item.album.artist.img1v1Url + '?param=224y224'" class="pic" />
        <div class="title-and-artist">
          <div class="title">
            <span>{{ item.name }}</span>
          </div>
          <div class="artist">
            <span v-for="ar in item.artists">{{ ar.name }}</span>
          </div>
        </div>
        <div class="album">
          <span>{{ item.album.name }}</span>
        </div>
      </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array
  },
  currentSongId: {
    type: Number
  }
})
</script>

<style lang="less" scoped>

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
</style>