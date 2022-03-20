export default {
  setCurrentSong(state, song) {
    state.currentSong = song
    localStorage.setItem('currentSong', JSON.stringify(state.currentSong))
  },
  setUser(state, user) {
    state.user = user
  },
  setPlayingStatus(state, playingStatus) {
    state.playing = playingStatus
  },
  setLoginStatus(state, loginStatus) {
    state.isLogged = loginStatus
  },
  setPlayList(state, songs) {
    const copy = state.playlist.slice()
    if (!copy.find(({ id }) => id === songs.id)) {
      state.playlist.push(songs)
      localStorage.setItem('playlist', JSON.stringify(state.playlist))
    }
  }
}