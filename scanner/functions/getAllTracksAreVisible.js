function getAllTracksAreVisible(state) {
  return getVisibleTrackIds(state).length === state.playlist.trackOrder.length;
}