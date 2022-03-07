import service from '../utils/service'

export function _cellphoneLogin(phone, password) {
  return service({
    url: '/login/cellphone',
    method: 'POST',
    // 加入时间戳防止混存数据(服务端开发者设置了同一IP两分钟访问混缓存)
    params: {
      timestamp: new Date().getTime()
    },
    data: {
      phone,
      password
    }
  })
}

export function _logout() {
  return service({
    url: '/logout',
    method: 'POST',
  });
}

export function _refreshCookie() {
  return service({
    url: '/login/refresh',
    method: 'POST',
  });
}

