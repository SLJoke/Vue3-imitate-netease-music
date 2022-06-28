<template>
  <div class="search-input-wrap">
    <form class="search-input" @submit="$emit('searchWithForm', { $event, keywords })">
      <i class="iconfont icon-search"></i>
      <input type="text" placeholder="请输入..." @click="show" v-model="keywords" />
    </form>
    <div v-if="isShow" class="panel">
      <teleport to="body">
        <div v-if="isShow" class="panel-mask" @click="hidden"></div>
      </teleport>
      <div class="title">
        <span>搜索历史</span>
        <span @click="clear" class="delete">
          <i class="iconfont icon-delete"></i>
        </span>
      </div>
      <div class="search-record" v-if="searchHistory.length > 0">
        <span class="search-record-item" v-for="item in searchHistory">{{ item }}</span>
      </div>
      <div class="search-record" v-else>
        <span>搜索记录为空</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';

const keywords = ref(null)
const isShow = ref(false)
const store = useStore()

const searchHistory = computed(() => store.state.searchHistory)
const clear = () => {
  if (searchHistory.value.length > 0) {
    if (confirm('确认清除吗？'))
      store.commit('clearSearchHistory')
  }
}
const show = () => {
  isShow.value = true
}
const hidden = () => {
  isShow.value = false
}
</script>

<style lang="less" scoped>
.search-input-wrap {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;

  .search-input {
    width: 200px;
    height: 35px;
    border-radius: 20px;
    color: var(--color-black-white);
    background-color: rgba(100, 100, 100, .1);
    display: flex;
    align-items: center;
    overflow: hidden;

    .iconfont {
      width: 35px;
      text-align: center;
      line-height: 35px;
    }

    input {
      width: 165px;
      padding-right: 20px;
      color: var(--color-black-white);

      &::placeholder {
        color: var(--color-black-white);
      }
    }
  }

  .panel {
    width: 300px;
    height: 400px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    border-radius: 3px;
    position: absolute;
    top: 110%;
    z-index: 1001;

    .title {
      font-size: 16px;
      margin-bottom: 10px;

      .delete {
        margin-left: 5px;
      }
    }

    .search-record {
      font-size: 12px;

      &-item {
        display: inline-block;
        background-color: rgba(0, 0, 0, .3);
        color: #fff;
        padding: 5px;
        margin: 5px 5px 5px 0;
      }
    }
  }
}

.panel-mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
}
</style>