import { loginOut } from "@/utils/utils"

const playlist = JSON.parse(localStorage.getItem('playlist'))
const currentSong = JSON.parse(localStorage.getItem('currentSong'))

export default {
  user: {},
  // 播放状态
  playing: false,
  // 当前播放歌曲
  currentSong: currentSong || {},
  // 播放列表
  playlist: playlist || [],
  // 登录状态
  isLogged: loginOut() !== undefined ? true : false
}