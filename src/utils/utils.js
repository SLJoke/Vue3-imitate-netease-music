import { _getSongDetails } from "@/api/songs"
import store from "@/store"

export function setCookies(str) {
  const cookies = str.split(';;')
  cookies.map(cookie => {
    document.cookie = cookie
  })
}

export function loginOut() {
  const cookies = document.cookie.split(';')
  return cookies.find(cookie => {
    return cookie.match(/MUSIC_U/)
  })
}

export function clearCookies() {
  document.cookie = 'MUSIC_U=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

export async function setSongPlay (id) {
  // const res = await _getSongUrl(id)
  // const { url } = res.data[0]
  const details = await _getSongDetails(id)
  const { al, ar, name } = details.songs[0]
  const songs = {
    id,
    url: songUrlOuter(id),
    picUrl: al.picUrl,
    name: name,
    singer: setSinger(ar)
  }
  store.commit('setCurrentSong', songs)
  store.commit('setPlayList', songs)
}

export function songUrlOuter(id) {
  return `http://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function setSinger(items) {
  let arr = []
  items.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}