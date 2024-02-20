function _save () {
  let focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    focusedWindow.webContents.send('save')
  }
}