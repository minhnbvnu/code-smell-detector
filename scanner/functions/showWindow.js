function showWindow(onWindowLoaded) {
    log.info(getTrace('showWindow'));

    if (mainWindow) {
        mainWindow.show();

        if (typeof onWindowLoaded === 'function') {
            onWindowLoaded();
        }
    } else {
        app.dock.show();

        loadMainWindow(onWindowLoaded);
        uiEventListener.register(mainWindow);
    }
}