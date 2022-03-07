import service from '../utils/service'

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