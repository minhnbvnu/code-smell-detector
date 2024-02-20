function floating() {
    if (styleCache.has("floating-axis")) {
        // fix that floating window may be out of screen after changing screen resolution
        let isOnScreen = false;
        const displays = screen.getAllDisplays();
        for (let i = 0; i < displays.length; i++) {
            if (displays[i].bounds.x <= styleCache.get("floating-axis").x
                && displays[i].bounds.x + displays[i].bounds.width >= styleCache.get("floating-axis").x
                && displays[i].bounds.y <= styleCache.get("floating-axis").y
                && displays[i].bounds.y + displays[i].bounds.height >= styleCache.get("floating-axis").y) {
                isOnScreen = true;
                break;
            }
        }
        if (!isOnScreen) styleCache.delete("floating-axis");
    }
    if (app.isReady()) {
        if (win != null) {
            if (!hasFloating || floatingWin == null) {
                hasFloating = true;
                floatingWin = new BrowserWindow({
                    width: Math.floor(84 * ratio),
                    height: Math.floor(84 * ratio),
                    x: styleCache.has("floating-axis") ? styleCache.get("floating-axis").x : 33,
                    y: styleCache.has("floating-axis") ? styleCache.get("floating-axis").y : 33,
                    backgroundColor: isDarkMode() ? "#191919" : "#fefefe",
                    resizable: false,
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
                floatingWin.loadFile("floating.html");
                floatingWin.webContents.once('did-finish-load', () => {
                    floatingWin.show();
                    floatingWin.setAlwaysOnTop(true, "pop-up-menu");
                    floatingWin.focus();
                });
                floatingWin.on('closed', () => {
                    floatingWin = null;
                    hasFloating = false;
                    // no longer need this
                    /*if (win != null && process.platform === "darwin"){
                        win.show();
                    }*/
                });
                floatingWin.on('move', () => {
                    styleCache.set("floating-axis", {
                        x: floatingWin.getContentBounds().x,
                        y: floatingWin.getContentBounds().y
                    });
                })
            }
        }
    }
}