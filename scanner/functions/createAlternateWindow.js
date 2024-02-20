function createAlternateWindow() {

  console.log ("new browser");
  var newWin = new BrowserWindow({
    x: 10,
    y: 10,
    width: 800,
    height: 800,
    icon: path.join(__dirname, '/../resources/icon.png'),
    webPreferences:{nodeIntegration:false}});

    console.log ("startUrl");
    const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/../www/index.html'),
      protocol: 'file:',
      slashes: true
    });

    console.log ("new win");
    newWin.loadURL(startUrl);

}