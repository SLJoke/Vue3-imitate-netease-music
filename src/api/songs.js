import service from '@/utils/service'

export function _getSearch(keywords) {
  return service({
    url: `/search?keywords=${keywords}&limit=100`
  })
}

export function _getSongUrl(id) {
  return service({
    url: `/song/url?id=${id}`
  })
}

export function _getSongDetails(id) {
  return service({
    url: `/song/detail?ids=${id}`
  })
}

export function _getPlaylist(id) {
  return service({
    // limit 限制返回的数据量
    // offset 相当于分页
    // url: `/playlist/track/all?id=${id}&limit=10&offset=${offset}`
    url: `/playlist/detail?id=${id}`
  })
}

export function _getLyric(id) {
  return service({
    url: `/lyric?id=${id}`
  })
}