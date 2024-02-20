function files_loadMedia(e, loadStyle = LOAD_STYLE.NONE, atIndex = 0) {
  const {
    files
  } = e.dataTransfer;
  return async (dispatch, getState, {
    handleTrackDropEvent
  }) => {
    if (handleTrackDropEvent) {
      const tracks = await handleTrackDropEvent(e);

      if (tracks != null) {
        dispatch(files_loadMediaFiles(tracks, loadStyle, atIndex));
        return;
      }
    }

    dispatch(loadFilesFromReferences(files, loadStyle, atIndex));
  };
}