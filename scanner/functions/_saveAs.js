function _saveAs () {
  let focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    focusedWindow.webContents.send('saveAs')
  }
}