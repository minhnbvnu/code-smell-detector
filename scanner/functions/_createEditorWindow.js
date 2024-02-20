function _createEditorWindow (darPath, options = {}) {
  // Create the browser window.
  let editorWindow = new BrowserWindow({ width: 1024, height: 768 })
  let editorConfig = {
    darStorageFolder,
    darPath,
    readOnly: Boolean(options.isNew)
  }
  if (options.folder) {
    Object.assign(editorConfig, {
      unpacked: true
    })
  }
  editorWindow.editorConfig = editorConfig
  editorWindow.sharedStorage = sharedStorage

  let windowId = editorWindow.id
  windowStates.set(windowId, {
    dirty: false
  })
  // and load the index.html of the app.
  let mainUrl = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  })
  editorWindow.loadURL(mainUrl)

  // Open the DevTools.
  if (DEBUG) {
    editorWindow.webContents.openDevTools()
  }

  editorWindow.on('close', e => {
    let state = windowStates.get(windowId)
    if (state.dirty) {
      _promptUnsavedChanges(e, editorWindow)
    }
  })

  editorWindow.on('closed', e => {
    windowStates.delete(windowId)
  })
}