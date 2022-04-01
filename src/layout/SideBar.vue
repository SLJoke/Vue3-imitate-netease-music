<template>
  <ul class="side-bar">
    <li
      v-for="(item, index) in sideBar"
      :key="item.path"
    >
      <router-link
        :to="item.path"
        active-class="active"
      >
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
// 导入路由表里面的侧边栏映射表
import { sideBar } from '@/router/routes'
</script>

<style lang="less" scoped>
.side-bar {
  width: 170px;
  height: 100%;
  padding: 8px 0;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 1px 0 0 #d1d1d1;

  li {
    list-style: none;

    a {
      display: block;
      margin: 5px 10px;
      height: 35px;
      line-height: 35px;
      text-indent: 10px;
      text-align: left;
      &:hover {
        color: #000;
        background-color: #f6f6f7;        
      }
    }

    .active {
      color: #000;
      font-size: 17px;
      font-weight: bold;
      border-radius: 5px;
      background-color: #f6f6f7;
    }
  }
}
</style>