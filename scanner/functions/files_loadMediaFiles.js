function files_loadMediaFiles(tracks, loadStyle = LOAD_STYLE.NONE, atIndex = 0) {
  return dispatch => {
    if (loadStyle === LOAD_STYLE.PLAY) {
      // I'm the worst. It just so happens that in every case that we autoPlay,
      // we should also clear all tracks.
      dispatch(playlist_removeAllTracks());
    }

    tracks.forEach((track, i) => {
      const priority = i === 0 ? loadStyle : LOAD_STYLE.NONE;
      dispatch(loadMediaFile(track, priority, atIndex + i));
    });
  };
}