function getChromeAppWindow(chromeAppWindow) {
  const chromeAppWindowCreate = chromeAppWindow.create;

  chromeAppWindow.create = function(page, options, cb) {
    var cw = getAppWindowForNativeId(options.id);
    if (cw) {
      // cw.focus();
      return;
    }

    chromeAppWindowCreate(options, function(w, existed, settings) {
      if (existed) {
        // cw.focus();
        return;
      }

      var cw = new AppWindow(w);
      if (cb)
        cb(cw);

      // load happens after callback to allow contentWindow stuff to be set.
      // var appDir = remote.getGlobal('chromeAppDir');
      // w.loadURL(`file://${appDir}/${page}`)
      w.once('ready-to-show', () => {
        w.show()
      })
      w.loadURL(`chrome-extension://${chrome.runtime.id}/${page}`);
      // this needs to happen only after the load.
      // console.log(settings);
      if (settings.isDevToolsOpened)
        w.webContents.openDevTools({mode: 'detach'});
    });
  }

  return chromeAppWindow;
}