function loadFilesFromReferences(fileReferences, loadStyle = LOAD_STYLE.PLAY, atIndex = undefined) {
  return dispatch => {
    if (fileReferences.length < 1) {
      return;
    } else if (fileReferences.length === 1) {
      const fileReference = fileReferences[0];

      if (SKIN_FILENAME_MATCHER.test(fileReference.name)) {
        dispatch(setSkinFromBlob(fileReference));
        return;
      } else if (EQF_FILENAME_MATCHER.test(fileReference.name)) {
        dispatch(setEqFromFileReference(fileReference));
        return;
      }
    }

    dispatch(addTracksFromReferences(fileReferences, loadStyle, atIndex));
  };
}