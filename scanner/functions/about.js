function about() {
    if (app.isReady()) {
        if (win != null) {
            aboutWin = new BrowserWindow({
                parent: win,
                width: Math.floor(720 * ratio),
                height: Math.floor(520 * ratio),
                backgroundColor: isDarkMode() ? "#191919" : "#fefefe",
                resizable: false,
                maximizable: false,
                minimizable: false,
                frame: false,
                show: false,
                center: true,
                titleBarStyle: "hidden",
                webPreferences: {
                    nodeIntegration: true,
                    webgl: false,
                    contextIsolation: false,
                    enableRemoteModule: true,
                    spellcheck: false
                },
            });
            require("@electron/remote/main").enable(aboutWin.webContents);
            aboutWin.loadFile("about.html");
            win.setAlwaysOnTop(true, "floating");
            aboutWin.setAlwaysOnTop(true, "floating");
            aboutWin.focus();
            aboutWin.once('ready-to-show', () => {
                aboutWin.show();
                try {
                    let aboutWinTouchBar = new TouchBar({
                        items: [
                            new TouchBarLabel({ label: "wnr " + i18n.__('v') + require("./package.json")["version"] })
                        ]
                    });
                    aboutWinTouchBar.escapeItem = new TouchBarButton({
                        label: i18n.__('close'),
                        click: () => aboutWin.close()
                    });
                    aboutWin.setTouchBar(aboutWinTouchBar);
                } catch (e) {
                    console.log(e);
                }
            })
            aboutWin.on('closed', () => {
                aboutWin = null;
                if (store.get("top") !== true) win.setAlwaysOnTop(false)
            })
        }
    }
}