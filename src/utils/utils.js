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