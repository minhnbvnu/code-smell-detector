function macOSFullscreenSolution(isFullScreen) {
    if (app.isReady()) {
        if (process.platform === 'darwin') {
            //dock
            const dockMenu = Menu.buildFromTemplate([{
                label: i18n.__('show-or-hide'),
                click: () => showOrHide()
            }]);

            app.dock.setMenu(dockMenu);

            //top bar
            let template;
            if (!isFullScreen)
                template = [{
                    label: 'wnr',
                    submenu: [{
                        label: i18n.__('about'),
                        enabled: !isTimerWin,
                        click: function () {
                            about();
                        }
                    }, {
                        type: 'separator'
                    }, {
                        label: i18n.__('quit'),
                        accelerator: 'CmdOrCtrl+Q',
                        enabled: !store.get('islocked'),
                        click: function () {
                            windowCloseChk();
                        }
                    }]
                }, {
                    label: i18n.__('edit'),
                    submenu: [{
                        label: i18n.__('copy'),
                        role: "copy"
                    }, {
                        label: i18n.__('paste'),
                        role: "paste"
                    }, {
                        label: i18n.__('select-all'),
                        role: "selectAll"
                    }, {
                        label: i18n.__('cut'),
                        role: "cut"
                    }]
                }, {
                    label: i18n.__('operations'),
                    submenu: [
                        {
                            label: i18n.__('show-or-hide'), click: function () {
                                showOrHide()
                            }
                        }, {
                            enabled: isTimerWin,
                            label: i18n.__('mini-mode'),
                            click: function () {
                                if (win != null) win.webContents.send("remote-control-msg", "enter");
                            }
                        }, {
                            type: 'separator'
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
                            enabled: !isTimerWin,
                            label: i18n.__('statistics'),
                            click: function () {
                                if (win != null) win.loadFile('statistics.html');
                            }
                        }, {
                            enabled: (!store.get('islocked')) && (!isTimerWin),
                            label: i18n.__('settings'),
                            click: function () {
                                settings('normal');
                            }
                        }, {
                            enabled: !isTimerWin,
                            label: i18n.__('locker-mode'),
                            click: function () {
                                locker();
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
                        }]
                }];
            else
                template = [{
                    label: 'wnr',
                    submenu: [{
                        label: i18n.__('about'),
                        enabled: false
                    }, {
                        type: 'separator'
                    }, {
                        label: i18n.__('quit'),
                        enabled: false
                    }]
                }, {
                    label: i18n.__('operations'),
                    submenu: [{
                        label: i18n.__('settings'),
                        enabled: false
                    }, {
                        label: i18n.__('locker-mode'),
                        enabled: false
                    }, {
                        type: 'separator'
                    }, {
                        label: i18n.__('website'),
                        enabled: false
                    }, {
                        label: i18n.__('github'),
                        enabled: false
                    }]
                }];
            let osxMenu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(osxMenu)
        }
    }
}