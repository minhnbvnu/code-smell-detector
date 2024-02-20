function playlist_scrollPlaylistByDelta(e) {
  e.preventDefault();
  return (dispatch, getState) => {
    const state = getState();

    if (getOverflowTrackCount(state)) {
      e.stopPropagation();
    }

    const totalPixelHeight = state.playlist.trackOrder.length * TRACK_HEIGHT;
    const percentDelta = e.deltaY / totalPixelHeight * 100;
    dispatch({
      type: SET_PLAYLIST_SCROLL_POSITION,
      position: clamp(state.display.playlistScrollPosition + percentDelta, 0, 100)
    });
  };
}