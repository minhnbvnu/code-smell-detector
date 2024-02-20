function externalTitle(title, notes) {
    if (app.isReady()) {
        if (win != null) {
            if (!hasExternalTitle || externalTitleWin == null) {
                hasExternalTitle = true;
                externalTitleWin = new BrowserWindow({
                    width: Math.floor(160 * ratio),
                    height: Math.floor(84 * ratio),
                    x: styleCache.has("external-title-axis") ? styleCache.get("external-title-axis").x : 33,
                    y: styleCache.has("external-title-axis") ? styleCache.get("external-title-axis").y : 33,
                    backgroundColor: isDarkMode() ? "#191919" : "#fefefe",
                    maximizable: false,
                    minimizable: false,
                    frame: false,
                    show: false,
                    center: false,
                    type: 'toolbar',
                    titleBarStyle: "customButtonsOnHover",
                    webPreferences: {
                        nodeIntegration: true,
                        webgl: false,
                        contextIsolation: false,
                        enableRemoteModule: true,
                        spellcheck: false
                    },
                    skipTaskbar: true
                });
                externalTitleWin.loadFile("external-title.html");
                externalTitleWin.webContents.once('did-finish-load', () => {
                    externalTitleWin.show();
                    externalTitleWin.setAlwaysOnTop(true, "pop-up-menu");
                    externalTitleWin.focus();

                    externalTitleWin.webContents.send('send-title', { title: title, notes: notes });
                });
                externalTitleWin.on('closed', () => {
                    externalTitleWin = null;
                    hasExternalTitle = false;
                });
                externalTitleWin.on('move', () => {
                    styleCache.set("external-title-axis", {
                        x: externalTitleWin.getContentBounds().x,
                        y: externalTitleWin.getContentBounds().y
                    });
                })
            }
        }
    }
}