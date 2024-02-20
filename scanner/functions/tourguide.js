function tourguide() {
    if (app.isReady()) {
        if (win != null && tourWin == null) {
            tourWin = new BrowserWindow({
                parent: win,
                width: Math.floor(400 * ratio),
                height: Math.floor(720 * ratio),
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
            require("@electron/remote/main").enable(tourWin.webContents);
            tourWin.loadFile("tourguide.html");
            win.setAlwaysOnTop(true, "floating");
            tourWin.setAlwaysOnTop(true, "floating");
            tourWin.focus();
            tourWin.once('ready-to-show', () => {
                tourWin.show();
                let tourWinTouchBar = new TouchBar({
                    items: [
                        new TouchBarLabel({ label: i18n.__('welcome-part-1') })
                    ]
                });
                tourWinTouchBar.escapeItem = new TouchBarButton({
                    label: i18n.__('close'),
                    click: () => tourWin.close()
                });
                tourWin.setTouchBar(tourWinTouchBar);
            });
            tourWin.on('closed', () => {
                tourWin = null;
                if (store.get("top") !== true) win.setAlwaysOnTop(false);
                win.moveTop();
                win.focus();
            });
            notificationSolution(i18n.__('welcome-part-1'), i18n.__('welcome-part-2'), "normal");
        }
    }
}