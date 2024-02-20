function files_addFilesAtIndex(nextIndex) {
  return async dispatch => {
    const fileReferences = await promptForFileReferences();
    dispatch(addTracksFromReferences(fileReferences, LOAD_STYLE.NONE, nextIndex));
  };
}