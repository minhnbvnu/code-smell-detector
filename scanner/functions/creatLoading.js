function creatLoading () {
  loadingWindow = new BrowserWindow({
    center: true,
    parent: mainWindow,
    show: true,
    width: 400,
    height: 230,
    autoHideMenuBar: true,
    frame: false,
    icon: '../../build/icons/256x256.png'
  })
  loadingWindow.loadURL(loadURL)
  loadingWindow.on('closed', () => loadingWindow = null) // eslint-disable-line
  // loadingWindow.webContents.on('did-finish-load', () => loadingWindow.show())
}