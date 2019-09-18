const spotify = require('./spotify')
const shuffleArray = require('shuffle-array')

const MAX_AHEAD_TIME = 5 * 60 * 1000;

const getTracksByUser = tracks => {
  const tracksByUser = {};
  tracks.forEach(track => {
    const user = track.added_by.id;
    if (!tracksByUser[user]) {
      tracksByUser[user] = [track]
    } else {
      tracksByUser[user].push(track)
    }
  });
  return tracksByUser;
}

const getNextUser = (tracksByUser, durationsByUser) => {
  const usersWithTracks = Object.keys(tracksByUser)
    .filter(user => tracksByUser[user].length);
  const durations = usersWithTracks.map(user => durationsByUser[user]);
  const minDuration = Math.min(...durations);
  const validUsers = usersWithTracks
    .filter(user => durationsByUser[user] - minDuration <= MAX_AHEAD_TIME);
  console.log(`Choosing between ${validUsers}`)
  return validUsers.length && validUsers[Math.floor(Math.random() * validUsers.length)]
}

const getShuffledTracks = tracks => {
  const tracksByUser = getTracksByUser(tracks);
  const durationsByUser = Object.keys(tracksByUser).reduce((map, user) => ({
    ...map,
    [user]: 0
  }), {})
  Object.keys(tracksByUser).forEach(user => shuffleArray(tracksByUser[user]));
  let nextUser;
  const shuffledTracks = [];
  while (nextUser = getNextUser(tracksByUser, durationsByUser)) {
    console.log(`Chosen ${nextUser}`)
    const nextTrack = tracksByUser[nextUser].pop().track;
    shuffledTracks.push(nextTrack.uri);
    durationsByUser[nextUser] += nextTrack.duration_ms
  }
  return shuffledTracks;
}

const shufflePlaylist = async playlistId => {
  const { name } = await spotify.getPlaylist(playlistId);
  const tracks = await spotify.getAllTracks(playlistId);
  const shuffledTracks = getShuffledTracks(tracks);
  const newPlaylistId = await spotify.createPlaylist(`${name} SHUFFLED`);
  await spotify.addAllTracks(newPlaylistId, shuffledTracks);
}

module.exports = {
  shufflePlaylist
}
