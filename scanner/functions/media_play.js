function media_play() {
  return (dispatch, getState) => {
    const state = getState();

    if (state.media.status === MEDIA_STATUS.STOPPED && state.playlist.currentTrack == null && state.playlist.trackOrder.length === 0) {
      dispatch(files_openMediaFileDialog());
    } else {
      dispatch({
        type: PLAY
      });
    }
  };
}