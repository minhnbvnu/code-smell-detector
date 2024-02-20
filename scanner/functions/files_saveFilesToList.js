function files_saveFilesToList() {
  return (dispatch, getState, {
    handleSaveListEvent
  }) => {
    if (handleSaveListEvent) {
      handleSaveListEvent(getUserTracks(getState()));
    } else {
      alert("Not supported in Webamp");
    }
  };
}