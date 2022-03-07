export default {
  setCurrentSong(state, song) {
    state.currentSong = song
  },
  setUser(state, user) {
    state.user = user
  },
  setPlayingStatus(state, playingStatus) {
    state.playing = playingStatus
  },
  setLoginStatus(state, loginStatus) {
    state.isLogged = loginStatus
  }
}