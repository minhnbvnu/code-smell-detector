function files_addFilesFromUrl(atIndex = 0) {
  return async (dispatch, getState, {
    handleAddUrlEvent
  }) => {
    if (handleAddUrlEvent) {
      const tracks = await handleAddUrlEvent();

      if (tracks != null) {
        dispatch(files_loadMediaFiles(tracks, LOAD_STYLE.NONE, atIndex));
        return;
      }
    } else {
      alert("Not supported in Webamp");
    }
  };
}