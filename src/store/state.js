import { loginOut } from "@/utils/utils"

const playlist = JSON.parse(localStorage.getItem('playlist'))
const currentSong = JSON.parse(localStorage.getItem('currentSong'))
const searchHistory = JSON.parse(localStorage.getItem('searchHistory'))

export default {
  user: {},
  // 播放状态
  playing: false,
  // 是否显示全屏
  isFullShow: false,
  // 搜索历史
  searchHistory: searchHistory || [],
  // 当前播放歌曲
  currentSong: currentSong || null,
  // 播放列表
  playlist: playlist || [],
  // 登录状态
  isLogged: loginOut() !== undefined ? true : false
}