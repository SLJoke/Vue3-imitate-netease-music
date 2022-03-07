import { loginOut } from "@/utils/utils"

export default {
  user: {},
  currentSong: {},
  playing: false,
  isLogged: loginOut() !== undefined ? true : false
}