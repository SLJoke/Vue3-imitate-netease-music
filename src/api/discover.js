import service from '@/utils/service'

export function _getBanner() {
  return service({
    url: '/banner'
  })
}

export function _getRecommendSongs() {
  return service({
    url: '/recommend/songs',
    params: {
      timestamp: new Date().getTime()
    }
  })
}

export function _getRecommendResource() {
  return service({
    url: '/recommend/resource',
    params: {
      timestamp: new Date().getTime()
    }
  })
}