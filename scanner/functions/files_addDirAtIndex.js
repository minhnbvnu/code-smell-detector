function files_addDirAtIndex(nextIndex) {
  return async dispatch => {
    if (!DIR_SUPPORT) {
      alert("Not supported in your browser");
      return;
    }

    const fileReferences = await promptForFileReferences({
      directory: true
    });
    dispatch(addTracksFromReferences(fileReferences, LOAD_STYLE.NONE, nextIndex));
  };
}