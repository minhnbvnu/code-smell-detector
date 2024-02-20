function playlist_removeAllTracks() {
  return dispatch => {
    // It's a bit funky that we need to do both of these.
    dispatch({
      type: STOP
    });
    dispatch({
      type: REMOVE_ALL_TRACKS
    });
  };
}