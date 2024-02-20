function traySolution(isFullScreen) {
    if (app.isReady()) {
        if (tray != null) {
            if (!isTimerWin) {
                if (process.platform === "win32") tray.setImage(path.join(__dirname, '\\res\\icons\\iconWin.ico'));
                else tray.setTitle("");
            }
        }
        if (!isFullScreen) {
            if ((!store.get("islocked")) && win != null) win.closable = true;
            if (process.platform === "win32" && win != null) win.setSkipTaskbar(false);
            contextMenu = Menu.buildFromTemplate([{
                label: 'wnr' + i18n.__('v') + require("./package.json").version,
                click: function () {
                    if (!isTimerWin) {
                        if (process.platform === "darwin" && win != null) win.show();
                        about();
                    }
                }
            }, {
                type: 'separator'
            }, {
                label: i18n.__('start-or-stop'),
                enabled: isTimerWin,
                click: function () {
                    if (win != null) win.webContents.send('start-or-stop');
                }
            }, {
                type: 'separator'
            }, {
                label: i18n.__('statistics'),
                type: 'submenu',
                submenu: [{
                    enabled: !isTimerWin,
                    label: i18n.__('statistics-enter'),
                    click: function () {
                        if (win != null) win.loadFile('statistics.html');
                        if (process.platform === "darwin" && win != null) win.show();
                    }
                }, {
                    label: i18n.__('statistics-work-time') + " "
                        + getStyledTimeForTray(statistics.get(yearMonDay).workTime)
                }, {
                    label: i18n.__('statistics-rest-time') + " "
                        + getStyledTimeForTray(statistics.get(yearMonDay).restTime)
                }, {
                    label: i18n.__('onlyrest') + " "
                        + getStyledTimeForTray(statistics.get(yearMonDay).onlyRest)
                }, {
                    label: i18n.__('positive') + " "
                        + getStyledTimeForTray(statistics.get(yearMonDay).positive)
                }, {
                    label: i18n.__('statistics-time-sum') + " "
                        + getStyledTimeForTray(statistics.get(yearMonDay).sum)
                }],
            }, {
                type: 'separator'
            }, {
                enabled: !isTimerWin,
                label: i18n.__('locker-mode'),
                click: function () {
                    if (process.platform === "darwin" && win != null) win.show();
                    locker();
                }
            }, {
                enabled: (!store.get('islocked')) && (!isTimerWin),
                label: i18n.__('settings'),
                click: function () {
                    if (process.platform === "darwin" && win != null) win.show();
                    settings("normal");
                }
            }, {
                enabled: !isTimerWin,
                label: i18n.__('onlyrest'),
                click: function () {
                    if (win != null) {
                        win.loadFile('index.html');
                        win.webContents.once('did-finish-load', function () {
                            win.webContents.send("onlyrest");
                        });
                    }
                    if (process.platform === "darwin" && win != null) win.show();
                }
            }, {
                enabled: !isTimerWin,
                label: i18n.__('positive'),
                click: function () {
                    if (win != null) {
                        win.loadFile('index.html');
                        win.webContents.once('did-finish-load', function () {
                            win.webContents.send("positive");
                        });
                    }
                    if (process.platform === "darwin" && win != null) win.show();
                }
            }, {
                type: 'separator'
            }, {
                label: i18n.__('website'),
                click: function () {
                    shell.openExternal('https://getwnr.com/');
                }
            }, {
                label: i18n.__('github'),
                click: function () {
                    shell.openExternal('https://github.com/RoderickQiu/wnr/');
                }
            }, {
                type: 'separator'
            }, {
                label: i18n.__('show-or-hide'), click: function () {
                    showOrHide()
                }
            }, {
                label: i18n.__('mini-mode'),
                enabled: isTimerWin,
                click: function () {
                    if (win != null) win.webContents.send("remote-control-msg", "enter")
                }
            }, {
                label: i18n.__('withdraw-timing'),
                enabled: isTimerWin,
                click: function () {
                    if (win != null) win.webContents.send('remote-control-msg', 'back')
                }
            }, {
                type: 'separator'
            }, {
                label: i18n.__('exit'),
                enabled: !store.get('islocked'),
                click: function () {
                    windowCloseChk()
                }
            }
            ]);
            if (tray != null) {
                tray.removeAllListeners('click');
                if (process.platform !== "linux")
                    tray.on('click', function () {
                        if (fullScreenProtection === false && process.platform === "win32") {
                            showOrHide();
                        }
                    });//tray
                tray.setContextMenu(contextMenu);
                tray.setToolTip("wnr");
            }
        } else {
            if (win != null && (!isLoose)) win.closable = false;
            if (process.platform === "win32" && win != null && (!isLoose)) win.setSkipTaskbar(true);
            contextMenu = Menu.buildFromTemplate([{
                label: 'wnr' + i18n.__('v') + require("./package.json").version
            }, {
                type: 'separator'
            }, {
                label: i18n.__('start-or-stop'),
                click: function () {
                    if (win != null) win.webContents.send('start-or-stop')
                }
            }]);
            if (tray != null) {
                tray.removeAllListeners('click');
                tray.setContextMenu(contextMenu);
                if (process.platform !== "linux")
                    tray.on('click', function () {
                    })
                tray.setToolTip("wnr");
            }
        }
    }
}