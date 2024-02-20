function settings(mode) {
    if (app.isReady()) {
        if (win != null && settingsWin == null) {
            settingsWin = new BrowserWindow({
                parent: win,
                width: Math.floor((isChinese ? 420 : 472) * ratio),
                height: Math.floor(636 * ratio),
                backgroundColor: isDarkMode() ? "#191919" : "#fefefe",
                maximizable: false,
                minimizable: false,
                frame: false,
                show: false,
                center: true,
                webPreferences: {
                    nodeIntegration: true,
                    webgl: false,
                    contextIsolation: false,
                    enableRemoteModule: true,
                    spellcheck: false
                },
                titleBarStyle: "hidden"
            });
            require("@electron/remote/main").enable(settingsWin.webContents);
            if (mode === 'locker') store.set("settings-goto", "locker");
            else if (mode === 'predefined-tasks') store.set("settings-goto", "predefined-tasks");
            else store.set("settings-goto", "normal");
            settingsWin.loadFile("preferences.html");
            win.setAlwaysOnTop(true, "floating");
            settingsWin.setAlwaysOnTop(true, "floating");
            settingsWin.focus();
            settingsWin.once('ready-to-show', () => {
                settingsWin.show();
                try {
                    let settingsWinTouchBar = new TouchBar({
                        items: [
                            new TouchBarLabel({ label: i18n.__('newbie-for-settings-tip') })
                        ]
                    });
                    settingsWinTouchBar.escapeItem = new TouchBarButton({
                        label: i18n.__('close'),
                        click: () => settingsWin.close()
                    });
                    settingsWin.setTouchBar(settingsWinTouchBar);
                } catch (e) {
                    console.log(e);
                }
            })
            settingsWin.on('closed', () => {
                if (win != null) {
                    win.reload();
                    if (store.get("top") !== true) win.setAlwaysOnTop(false);
                }
                settingsWin = null;
                isLoose = !!store.get("loose-mode");
                isForceScreenLock = !!store.get("force-screen-lock-mode");
            })
            if (!store.get("settings-experience")) {
                store.set("settings-experience", true);
                notificationSolution(i18n.__('newbie-for-settings'), i18n.__('newbie-for-settings-tip'), "normal");
                if (process.platform === "darwin")
                    notificationSolution(i18n.__('newbie-for-settings'), i18n.__('permission-ask'), "normal")
            }
        }
    }
}