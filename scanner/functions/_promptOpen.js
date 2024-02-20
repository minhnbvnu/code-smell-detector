function _promptOpen () {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Dar Files', extensions: ['dar'] }
    ]
  }, (fileNames) => {
    if (fileNames && fileNames.length > 0) {
      // not possible to select multiple DARs at once
      let darPath = fileNames[0]
      console.info('opening Dar: ', darPath)
      _createEditorWindow(darPath)
    }
  })
}