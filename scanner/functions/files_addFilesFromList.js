function files_addFilesFromList() {
  return async (dispatch, getState, {
    handleLoadListEvent
  }) => {
    if (handleLoadListEvent) {
      const tracks = await handleLoadListEvent();

      if (tracks != null) {
        dispatch(playlist_removeAllTracks());
        dispatch(files_loadMediaFiles(tracks, LOAD_STYLE.NONE, 0));
        return;
      }
    } else {
      alert("Not supported in Webamp");
    }
  };
}