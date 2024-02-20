function _openFileDialog(accept, expectedType) {
  return async dispatch => {
    var _fileReferences$;

    const fileReferences = await promptForFileReferences({
      accept
    });
    dispatch({
      type: "OPENED_FILES",
      expectedType,
      count: fileReferences.length,
      firstFileName: (_fileReferences$ = fileReferences[0]) === null || _fileReferences$ === void 0 ? void 0 : _fileReferences$.name
    });
    dispatch(loadFilesFromReferences(fileReferences));
  };
}