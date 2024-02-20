function scrollNTracks(n) {
  return (dispatch, getState) => {
    const state = getState();
    const overflow = getOverflowTrackCount(state);
    const currentOffset = getScrollOffset(state);
    const position = overflow ? clamp((currentOffset + n) / overflow, 0, 1) : 0;
    return dispatch({
      type: SET_PLAYLIST_SCROLL_POSITION,
      position: position * 100
    });
  };
}