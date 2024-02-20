function preventBrowserWindow(w) {
  w.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  })
}