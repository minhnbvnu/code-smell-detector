function makeRuntimeWindow() {
  if (false) {
    return require(path.join('..', 'api', 'chrome-runtime.js'))
  }

  if (chromeRuntimeWindow) {
    console.error('runtime already exists');
    return;
  }

  console.log('starting runtime');
  chromeRuntimeWindow = new BrowserWindow({
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true
      },
      show: false,
  });
  chromeRuntimeWindow.on('close', function() {
    console.log('chromeRuntimeWindow shutdown');
    console.log('windows remaining', BrowserWindow.getAllWindows())
    chromeRuntimeWindow = null;
  })
  var runtimePath = path.join(__dirname, '..', 'api', 'chrome-runtime.html');
  chromeRuntimeWindow.loadURL(`file://${runtimePath}`);
  // chromeRuntimeWindow.webContents.openDevTools({mode: 'detach'});
  chromeRuntimeWindow.hide();
  chromeRuntimeWindow.on('show', chromeRuntimeWindow.hide.bind(chromeRuntimeWindow));
}