function createWindow() {


// don't need these as we are using local menu bindings
/*const mx = globalShortcut.register('CommandOrControl+Alt+F', () => {

    console.log('Command Or Control+F is pressed');
    isFs = !isFs;
    win.setFullScreen(isFs);
  })

  const dbgx = globalShortcut.register('CommandOrControl+Alt+D', () => {
    console.log('CommandOrControl+Alt+D is pressed');
    win.webContents.openDevTools();
  })*/


  /*const newwinx = globalShortcut.register('CommandOrControl+Alt+N', () => {
    console.log('CommandOrControl+Alt+N is pressed');
    createAlternateWindow();
  })*/


  // Create the browser window.
  let mainWindowState = windowStateKeeper({
      //file: 'main.json',
      defaultWidth: 1000,
      defaultHeight: 800,
      webPreferences:{nodeIntegration:false}

   });
  win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        icon: path.join(__dirname, '/../resources/icon.png'),
        webPreferences:{nodeIntegration:false}});
//
    console.log (path.join(__dirname, '/../resources/icon.png'));




  /*  win.webContents.session.webRequest.onHeadersReceived({}, (d, c) => {
    if(d.responseHeaders['x-frame-options'] || d.responseHeaders['X-Frame-Options']){
        delete d.responseHeaders['x-frame-options'];
        delete d.responseHeaders['X-Frame-Options'];
    }
    c({cancel: false, responseHeaders: d.responseHeaders});
  });*/

  mainWindowState.manage(win);



  // fs will be arg 1 if its not run in electron debug mode
  if (argv.fs)
  {
        win.setFullScreen(true);
        isFs = true;
  }


  if (argv.proxy) {
    console.log ("PROXY SET: "+argv.proxy);
       win.webContents.session.setProxy({proxyRules:argv.proxy}, function() {});
  }

  if (argv.debug) {
    // Open the DevTools.
    win.webContents.openDevTools();
  }
  //win.webContents.openDevTools();
  // and load the index.html of the app.

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../www/index.html'),
    protocol: 'file:',
    slashes: true
  });

  win.loadURL(startUrl);
  //win.loadURL(`file://${__dirname}/index.html`);

  // Create the Application's main menu

 // const menu = Menu.buildFromTemplate(template)
 // Menu.setApplicationMenu(menu)


 const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools', accelerator: 'CmdOrCtrl+Shift+D'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen', accelerator: 'CmdOrCtrl+Shift+F'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'quit'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


// Emitted when the window is closed.
win.on('closed', () => {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  win.removeAllListeners();
  win = null;
});
}