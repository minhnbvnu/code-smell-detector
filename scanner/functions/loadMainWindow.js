function loadMainWindow(onWindowLoaded) {
    log.info(getTrace('loadMainWindow'));

    if (!mainWindow) {
        mainWindow = createWindow();
    }
    mainWindow.loadFile('./src/main/ui/options.html');

    // reloads page to update color theme if OS color theme has been changed
    nativeTheme.on('updated', () => {
        if (mainWindow) {
            mainWindow.webContents.reload();
        }
    });

    // on close
    mainWindow.on('close', (e) => {
        log.info('On main window close..');

        if (mainWindow && mainWindow.forceClose) {
            delete mainWindow.forceClose;

            log.info('Close confirmation skipped');
            return;
        }

        e.preventDefault();

        confirmWindowClose();
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        log.info('On main window closed..');

        app.dock.hide();

        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        uiEventListener.unregister(mainWindow);
        mainWindow = null;
    });

    // Open _target=blank hrefs in external window
    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });

    if (onWindowLoaded) {
        const onDidFinishLoad = () => {
            mainWindow.webContents.removeListener('did-finish-load', onDidFinishLoad);

            if (typeof onWindowLoaded === 'function') {
                onWindowLoaded();
            }
        };

        mainWindow.webContents.addListener('did-finish-load', onDidFinishLoad);
    }
}