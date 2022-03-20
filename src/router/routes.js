export const sideBar = [
  {
    path: '/',
    name: '发现音乐',
    component: () => import('@/views/discover/Discover.vue')
  },
  {
    path: '/radio',
    name: '电台',
    component: () => import('@/views/radio/Radio.vue')
  },
  {
    path: '/mv',
    name: '视频',
    component: () => import('@/views/Mv.vue')
  },
  {
    path: '/ranklist',
    name: '排行榜',
    component: () => import('@/views/ranklist/RankList.vue')
  }
]

export const routes = [
  ...sideBar,
  {
    path: '/search/:keywords',
    name: '搜索',
    component: () => import('@/views/search/Search.vue')
  },
  {
    path: '/playlist/:pid',
    name: '歌单详情',
    component: () => import('@/views/playlist/Playlist.vue')
  }
]