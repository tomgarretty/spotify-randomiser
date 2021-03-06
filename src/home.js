const spotify = require('./spotify');

const getHome = async () => {
  const isAuthenticated = spotify.isAuthenticated();
  const playlists = isAuthenticated ? await spotify.getPlaylists() : []
  return {
    isAuthenticated,
    playlists
  }
}

module.exports = {
  getHome
}
