function files_droppedFiles(e, windowId) {
  return dispatch => {
    var _e$dataTransfer$files;

    return dispatch({
      type: "DROPPED_FILES",
      count: e.dataTransfer.files.length,
      firstFileName: (_e$dataTransfer$files = e.dataTransfer.files[0]) === null || _e$dataTransfer$files === void 0 ? void 0 : _e$dataTransfer$files.name,
      windowId
    });
  };
}