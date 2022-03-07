<template>
  <form class="search-input" @submit="$emit('searchWithForm', {$event, keywords})">
    <i
      class="iconfont icon-search"
      @click="search"
    ></i>
    <input
      type="text"
      placeholder="请输入..."
      v-model="keywords"
    />
  </form>
</template>

<script setup>
import { ref } from 'vue'

const keywords = ref(null)

const search = async () => {
  console.log('keywords is:', keywords.value)
}
</script>

<style lang="less" scoped>
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
    &:hover {
      background-color: rgba(218, 218, 218, .5);
    }
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
</style>